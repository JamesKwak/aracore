# Minimal static file server for local development (no Python/Node required).
# Usage: powershell -NoProfile -ExecutionPolicy Bypass -File tools/serve.ps1 [port]
param([int]$Port = 5500)

$root = Split-Path -Parent $PSScriptRoot
$mime = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "text/javascript; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".ico"  = "image/x-icon"
  ".woff2" = "font/woff2"
  ".webmanifest" = "application/manifest+json"
  ".json" = "application/json"
  ".xml"  = "application/xml"
  ".txt"  = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Serving $root at http://localhost:$Port/"

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    try {
      $relPath = [Uri]::UnescapeDataString($request.Url.AbsolutePath).TrimStart("/")
      if ($relPath -eq "" -or $relPath.EndsWith("/")) { $relPath += "index.html" }
      $fullPath = Join-Path $root ($relPath -replace "/", "\")
      $resolved = [IO.Path]::GetFullPath($fullPath)
      if (-not $resolved.StartsWith($root, [StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $resolved -PathType Leaf)) {
        $notFound = Join-Path $root "404.html"
        $response.StatusCode = 404
        if (Test-Path $notFound) {
          $bytes = [IO.File]::ReadAllBytes($notFound)
          $response.ContentType = "text/html; charset=utf-8"
          $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
      } else {
        $ext = [IO.Path]::GetExtension($resolved).ToLowerInvariant()
        $type = $mime[$ext]
        if (-not $type) { $type = "application/octet-stream" }
        $bytes = [IO.File]::ReadAllBytes($resolved)
        $response.ContentType = $type
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } catch {
      try { $response.StatusCode = 500 } catch {}
    } finally {
      try { $response.OutputStream.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
}
