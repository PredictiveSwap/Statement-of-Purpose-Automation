@echo off
echo Starting SOP Generator...
python app.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Error running the application.
    echo Please make sure Python is installed and in your PATH.
    echo Also ensure all dependencies are installed with:
    echo     pip install -r requirements.txt
    pause
) 