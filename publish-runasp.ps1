param(
  [string]$Configuration = "Release",
  [string]$PublishProfile = "site57471-WebDeploy"
)

$settingsPath = Join-Path $PSScriptRoot "glostrainer.runasp.net-WebDeploy (1).publishSettings"
if (-not (Test-Path $settingsPath)) {
  Write-Error "Kunde inte hitta publish settings-filen: $settingsPath"
  exit 1
}

[xml]$xml = Get-Content $settingsPath
$profile = $xml.publishData.publishProfile
if (-not $profile) {
  Write-Error "Kunde inte lasa publish profile i settings-filen."
  exit 1
}

$password = $profile.userPWD
if ([string]::IsNullOrWhiteSpace($password)) {
  Write-Error "Inget userPWD hittades i publish settings-filen."
  exit 1
}

dotnet publish .\GlosTrainer.Web.csproj -c $Configuration /p:PublishProfile=$PublishProfile /p:Password="$password"
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}

Write-Output "Publicering klar med publish profile '$PublishProfile'."
