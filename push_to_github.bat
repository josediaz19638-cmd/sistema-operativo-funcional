@echo off
cd /d "c:\Users\migue\Downloads\Sistema operativo funcional"

echo Agregando remoto...
git remote add origin https://github.com/josecamargoca-eng/sistema-operativo-funcional.git

echo Renombrando rama a main...
git branch -M main

echo Haciendo push a GitHub...
git push -u origin main

echo.
echo ===== PUSH COMPLETADO =====
echo Tu repositorio está en: https://github.com/josecamargoca-eng/sistema-operativo-funcional
echo.
pause
