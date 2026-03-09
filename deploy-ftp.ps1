param(
  [string]$FtpHost = "site57471.siteasp.net",
  [int]$Port = 21,
  [string]$Username = "site57471",
  [string]$Password = "",
  [string]$LocalPath = ".\bin\Release\net8.0\publish",
  [string]$RemotePath = "/wwwroot"
)

if ([string]::IsNullOrWhiteSpace($Password)) {
  Write-Error "Password saknas. Ange -Password."
  exit 1
}

$localFullPath = (Resolve-Path $LocalPath).Path
if (-not (Test-Path $localFullPath)) {
  Write-Error "LocalPath finns inte: $LocalPath"
  exit 1
}

$baseUri = "ftp://{0}:{1}{2}" -f $FtpHost, $Port, $RemotePath.TrimEnd("/")
$credential = New-Object System.Net.NetworkCredential($Username, $Password)

function New-FtpRequest([string]$uri, [string]$method) {
  $request = [System.Net.FtpWebRequest]::Create($uri)
  $request.Credentials = $credential
  $request.Method = $method
  $request.UseBinary = $true
  $request.KeepAlive = $false
  $request.UsePassive = $true
  return $request
}

function Ensure-RemoteDirectory([string]$uri) {
  try {
    $request = New-FtpRequest -uri $uri -method ([System.Net.WebRequestMethods+Ftp]::MakeDirectory)
    $response = $request.GetResponse()
    $response.Close()
  } catch [System.Net.WebException] {
    $ftpResponse = $_.Exception.Response -as [System.Net.FtpWebResponse]
    if ($ftpResponse -and ($ftpResponse.StatusCode -eq [System.Net.FtpStatusCode]::ActionNotTakenFileUnavailable)) {
      return
    }
    throw
  }
}

Write-Host "Publicerar lokalt..."
dotnet publish .\GlosTrainer.Web.csproj -c Release
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Host "Skapar mappar pa FTP..."
$dirs = Get-ChildItem -Path $localFullPath -Directory -Recurse |
  Sort-Object { $_.FullName.Length }

Ensure-RemoteDirectory -uri $baseUri
foreach ($dir in $dirs) {
  $relative = $dir.FullName.Substring($localFullPath.Length).TrimStart('\').Replace('\', '/')
  $targetUri = "$baseUri/$relative"
  Ensure-RemoteDirectory -uri $targetUri
}

Write-Host "Laddar upp filer..."
$files = Get-ChildItem -Path $localFullPath -File -Recurse
$count = 0
foreach ($file in $files) {
  $relative = $file.FullName.Substring($localFullPath.Length).TrimStart('\').Replace('\', '/')
  $targetUri = "$baseUri/$relative"

  $request = New-FtpRequest -uri $targetUri -method ([System.Net.WebRequestMethods+Ftp]::UploadFile)
  $content = [System.IO.File]::ReadAllBytes($file.FullName)
  $request.ContentLength = $content.Length
  $stream = $request.GetRequestStream()
  $stream.Write($content, 0, $content.Length)
  $stream.Close()
  $response = $request.GetResponse()
  $response.Close()

  $count += 1
  if ($count % 25 -eq 0) {
    Write-Host "Uppladdade $count filer..."
  }
}

Write-Host "FTP deploy klar. Filer uppladdade: $count"
