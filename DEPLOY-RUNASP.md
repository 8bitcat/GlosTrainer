# Deploy to runasp.net

Projektet ar nu konfigurerat med publish profile:
- `Properties/PublishProfiles/site57471-WebDeploy.pubxml`

## Publicera med profil (manuellt)
```powershell
dotnet publish .\GlosTrainer.Web.csproj -c Release /p:PublishProfile=site57471-WebDeploy /p:Password="<losenord>"
```

`<losenord>` ar `userPWD` fran:
- `glostrainer.runasp.net-WebDeploy (1).publishSettings`

## Publicera med script (automatisk lasning av userPWD)
```powershell
.\publish-runasp.ps1
```

## Snabbkontroll efter deploy
- `https://glostrainer.runasp.net/`
- `https://glostrainer.runasp.net/health`
