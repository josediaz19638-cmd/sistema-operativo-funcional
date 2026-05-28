@echo off
cd /d "c:\Users\migue\Downloads\Sistema operativo funcional"

echo Verificando remoto actual...
git remote -v

echo.
echo Cambiando remoto a la cuenta correcta...
git remote set-url origin https://github.com/josediaz19638-cmd/sistema-operativo-funcional.git

echo.
echo Verificando nuevo remoto...
git remote -v

echo.
echo Haciendo push...
git push -u origin main

echo.
echo ===== REMOTO ACTUALIZADO =====
echo.
pause
