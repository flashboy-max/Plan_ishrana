@echo off
echo Starting local development server...
echo.
echo Choose your preferred method:
echo [1] Python 3 HTTP Server (Recommended)
echo [2] Python 2 HTTP Server 
echo [3] Node.js http-server
echo [4] PHP Built-in Server
echo.

set /p choice="Enter your choice (1-4): "

if %choice%==1 (
    echo Starting Python 3 HTTP Server on port 8000...
    echo Open: http://localhost:8000
    python -m http.server 8000
) else if %choice%==2 (
    echo Starting Python 2 HTTP Server on port 8000...
    echo Open: http://localhost:8000
    python -m SimpleHTTPServer 8000
) else if %choice%==3 (
    echo Installing and starting Node.js http-server...
    echo Open: http://localhost:8000
    npm install -g http-server
    http-server -p 8000
) else if %choice%==4 (
    echo Starting PHP Built-in Server on port 8000...
    echo Open: http://localhost:8000
    php -S localhost:8000
) else (
    echo Invalid choice. Defaulting to Python 3...
    echo Open: http://localhost:8000
    python -m http.server 8000
)

pause
