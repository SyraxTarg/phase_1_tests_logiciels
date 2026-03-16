[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
"RESET DU POKECENTER".ToCharArray() | ForEach-Object { Write-Host $_ -NoNewline; Start-Sleep -Milliseconds 50 }
Clear-Host
$ball = @'
        ⣀⣤⣶⣶⣿⣿⣿⣿⣿⣶⣶⣤⣄⡀
    ⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣄
  ⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄
 ⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠙⣿⣿⣿⣿⣿⣆
⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠿⠿⢿⣧⡀⠀⢠⣿⠟⠛⠛⠿⣿⡆
⢰⣿⣿⣿⣿⣿⣿⠿⠟⠋⠉⠁⠀⠀⠀⠀⠀⠙⠿⠿⠟⠋⠀⠀⠀⣠⣿⠇
⢸⣿⣿⡿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⠟⠋
⢸⣿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣴⣾⠿⠛⠉
⠈⢿⣷⣤⣤⣄⣠⣤⣤⣤⣤⣶⣶⣾⠿⠿⠛⠛⠉⠁
'@

$base = @'
⢠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣶⣦⣤⣀
⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣄
⢸⣿⡛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀
  ⢻⣧⠀⠈⠙⠛⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇
  ⠈⢿⣧⠀⠀⠀⠀⠀⠀⠉⠙⠛⠻⠿⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁
     ⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⠟⠀  ⣠⣾⠟
       ⠈⠻⣷⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉  ⢀⣤⣾⠟⠁
            ⠙⠻⠿⣶⣦⣤⣤⣤⣤⣤⣤⣶⡿⠟⠋⠁
'@

Write-Host $ball -ForegroundColor Red
Write-Host $base -ForegroundColor White
Write-Host ""
Write-Host "------------------------------------------" -ForegroundColor Red
Write-Host "       RESET DU POKECENTER EN COURS...    " -ForegroundColor White -BackgroundColor Red
Write-Host "------------------------------------------" -ForegroundColor Red
Write-Host ""
Write-Host " Purge de la base ..." -ForegroundColor Red

Remove-Item ./pokecenter.db
Write-Host ""
Write-Host " Génération de la nouvelle base ..." -ForegroundColor Yellow
npx prisma db push

npx prisma generate

node ./scripts/seed_db.js

Write-Host ""
Write-Host " [||||||||||||||||||||||||||||||||||] 100%" -ForegroundColor Green
Write-Host ""
Write-Host " Infirmière Joëlle : 'Vos Pokémon sont en pleine forme !'" -ForegroundColor Cyan


nodemon ./index.js