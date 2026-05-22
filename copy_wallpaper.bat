@echo off
REM Creates public folder and copies provided wallpaper into it.
REM Run this from the project root: double-click or run in cmd.
mkdir "%~dp0public" 2>nul
copy "C:\Users\migue\AppData\Roaming\Code\User\globalStorage\github.copilot-chat\copilot-cli-images\1779458859842-u2vdh6bk.png" "%~dp0public\wallpaper.png" /Y
if %ERRORLEVEL% EQU 0 (
  echo Copied wallpaper to %~dp0public\wallpaper.png
) else (
  echo Failed to copy. Ensure the source file exists and run from project root.
)
pause
