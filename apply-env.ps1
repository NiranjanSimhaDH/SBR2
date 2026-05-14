# SOUTH BLOC REPORTS — Environment Sync Script
# This script reads .env and generates config.js for the frontend.

if (Test-Path ".env") {
    $envContent = Get-Content ".env"
    $config = "window.CONFIG = {`n"
    
    foreach ($line in $envContent) {
        if ($line.Trim() -and -not $line.StartsWith("#")) {
            $parts = $line.Split("=", 2)
            if ($parts.Count -eq 2) {
                $key = $parts[0].Trim()
                $val = $parts[1].Trim()
                $config += "    ${key}: '${val}',`n"
            }
        }
    }
    
    $config += "};"
    $config | Out-File -FilePath "config.js" -Encoding utf8
    Write-Host "SUCCESS: config.js generated from .env" -ForegroundColor Green
} else {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
}
