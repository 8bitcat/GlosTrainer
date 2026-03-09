$ErrorActionPreference = "Stop"
$path = Join-Path $PSScriptRoot "..\wwwroot\js\site.js"
$content = Get-Content $path -Raw
$indexPath = Join-Path $PSScriptRoot "..\Pages\Index.cshtml"
$indexContent = Get-Content $indexPath -Raw

function Assert-JsContains([string]$needle, [string]$label) {
  if (-not $content.Contains($needle)) {
    throw "FAILED: $label (missing: $needle)"
  }
  Write-Output "PASS: $label"
}

Assert-JsContains 'setPreviewBoss(bossId)' 'Preview API exists'
Assert-JsContains 'arena.bossX = 730;' 'Preview resets boss position'
Assert-JsContains 'arena.roundStartMs = 0;' 'Preview clears active round timer'
Assert-JsContains 'elements.bossSelect.addEventListener(' 'Boss dropdown change handler exists'
Assert-JsContains 'bossFightEngine.setPreviewBoss(appState.bossFight.selectedBossId);' 'Dropdown triggers preview swap'
Assert-JsContains 'const spinAngle = boss.id === "oiia" ? t / 180 : 0;' 'OIIA spin angle is defined'
Assert-JsContains 'ctx.scale(oiiaSqueeze * oiiaFlip, 1);' 'OIIA squeeze/flip turn exists'
Assert-JsContains 'ctx.rotate(spinAngle * 0.08);' 'OIIA sprite rotates'
Assert-JsContains 'openGroupFightPopup();' 'Group fight popup call exists'
Assert-JsContains 'appState.groupFight.teamB.push(user);' 'Opponent is routed into group fight team B'

$challengeSnippet = @'
      action.addEventListener("click", () => {
        if (!canChallenge) {
          return;
        }
        openGroupFightPopup();
        removeFromTeams(user);
        appState.groupFight.teamB.push(user);
        renderGroupFightPopup();
      });
'@
Assert-JsContains $challengeSnippet 'Online challenge button click handler is wired to group fight flow'

if ($indexContent.Contains('practiceLanguageSelect')) {
  throw 'FAILED: Index still contains legacy practice language selector'
}
Write-Output 'PASS: Index no longer contains legacy practice language selector'

if (-not $indexContent.Contains('id="appLanguageSelect"')) {
  throw 'FAILED: Index is missing top-level language selector'
}
Write-Output 'PASS: Index contains top-level language selector'

if (-not $indexContent.Contains('id="groupFightLanguageSelect"')) {
  throw 'FAILED: Group fight popup is missing language selector'
}
Write-Output 'PASS: Group fight popup contains language selector'

Write-Output 'All boss UI regression checks passed.'
