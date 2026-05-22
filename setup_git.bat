@echo off
cd /d "c:\Users\migue\Downloads\Sistema operativo funcional"

echo Configurando Git...
git config --global user.name "Jose Diaz"
git config --global user.email "josediaz19638@gmail.com"

echo Inicializando repositorio...
git init

echo Agregando archivos...
git add .

echo Creando commit inicial...
git commit -m "Initial commit: Sistema operativo funcional"

echo.
echo ===== GIT CONFIGURADO =====
echo Ahora debes:
echo 1. Ir a https://github.com/new
echo 2. Crear nuevo repositorio llamado: "sistema-operativo-funcional"
echo 3. Copiar la URL del repositorio
echo 4. Ejecuta estos comandos (reemplaza URL):
echo    git remote add origin https://github.com/TU_USUARIO/sistema-operativo-funcional.git
echo    git branch -M main
echo    git push -u origin main
echo.
pause
