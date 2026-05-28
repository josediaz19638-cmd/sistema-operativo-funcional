@echo off
cd /d "c:\Users\migue\Downloads\Sistema operativo funcional"

echo Agregando vercel.json...
git add vercel.json

echo Haciendo commit...
git commit -m "Add Vercel configuration"

echo Haciendo push...
git push origin main

echo.
echo ===== PUSH COMPLETADO =====
echo Ahora ve a: https://vercel.com/new
echo Conecta tu GitHub y deploya el repositorio
echo.
pause
