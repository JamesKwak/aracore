$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$indexPath = Join-Path $root "index.html"
$source = Get-Content -Raw -Encoding UTF8 -LiteralPath $indexPath

function Get-Between {
  param(
    [string]$Text,
    [string]$Start,
    [string]$End
  )
  $startIndex = $Text.IndexOf($Start)
  if ($startIndex -lt 0) { throw "Start marker not found: $Start" }
  $endIndex = $Text.IndexOf($End, $startIndex)
  if ($endIndex -lt 0) { throw "End marker not found after: $Start" }
  return $Text.Substring($startIndex, $endIndex - $startIndex)
}

function Replace-CommonLinks {
  param([string]$Html)
  $Html = $Html.Replace('href="#"', 'href="index.html"')
  $Html = $Html.Replace('href="#product"', 'href="product.html"')
  $Html = $Html.Replace('href="#usecases"', 'href="usecases.html"')
  $Html = $Html.Replace('href="#developers"', 'href="developers.html"')
  $Html = $Html.Replace('href="#onboarding"', 'href="onboarding.html"')
  $Html = $Html.Replace('href="#company"', 'href="company.html"')
  $Html = $Html.Replace('href="#contact"', 'href="index.html#contact"')
  $Html = $Html.Replace('href="#flow"', 'href="index.html#flow"')
  return $Html
}

function Set-ActiveNav {
  param(
    [string]$Html,
    [string]$Href
  )
  return $Html.Replace("href=`"$Href`"", "class=`"active`" href=`"$Href`"")
}

$head = Get-Between $source "<!DOCTYPE html>" "</head>"
$head = $head + "</head>"
$head = $head.Replace('.nav-links a{opacity:.82}.nav-links a:hover{opacity:1;color:var(--blue)}', '.nav-links a{opacity:.82}.nav-links a:hover,.nav-links a.active{opacity:1;color:var(--blue)}')

$sideRail = Get-Between $source '<div class="side-rail"' '<nav class="nav">'
$nav = Get-Between $source '<nav class="nav">' '<main>'
$footerAndScript = Get-Between $source '<footer class="footer">' '</body>'
$footerAndScript = $footerAndScript + "</body>`n</html>`n"

$hero = Get-Between $source '<section class="hero">' '<div class="logo-strip">'
$logoStrip = Get-Between $source '<div class="logo-strip">' '<section id="product">'
$product = Get-Between $source '<section id="product">' '<section id="tech">'
$tech = Get-Between $source '<section id="tech">' '<section id="usecases">'
$usecases = Get-Between $source '<section id="usecases">' '<section id="developers">'
$developers = Get-Between $source '<section id="developers">' '<section id="onboarding">'
$onboarding = Get-Between $source '<section id="onboarding">' '<section id="company">'
$company = Get-Between $source '<section id="company">' '<section class="cta" id="contact">'
$contact = Get-Between $source '<section class="cta" id="contact">' '</main>'

function New-Page {
  param(
    [string]$FileName,
    [string]$TitlePrefix,
    [string]$ActiveHref,
    [string]$MainHtml
  )
  $pageHead = $head.Replace('<title>Aracore ISN - Institutional Settlement Network</title>', "<title>$TitlePrefix - Aracore ISN</title>")
  $pageNav = Set-ActiveNav -Html (Replace-CommonLinks $nav) -Href $ActiveHref
  $html = $pageHead + "`n<body>`n" + (Replace-CommonLinks $sideRail) + $pageNav + "<main>`n" + $MainHtml + "`n</main>`n" + (Replace-CommonLinks $footerAndScript)
  Set-Content -Encoding UTF8 -LiteralPath (Join-Path $root $FileName) -Value $html
}

$homeNav = Replace-CommonLinks $nav
$homeMain = $hero + $logoStrip + $contact
$homeHtml = $head + "`n<body>`n" + (Replace-CommonLinks $sideRail) + $homeNav + "<main>`n" + $homeMain + "`n</main>`n" + (Replace-CommonLinks $footerAndScript)
Set-Content -Encoding UTF8 -LiteralPath $indexPath -Value $homeHtml

New-Page -FileName "product.html" -TitlePrefix "Product" -ActiveHref "product.html" -MainHtml ($product + "`n" + $tech + "`n" + $contact)
New-Page -FileName "usecases.html" -TitlePrefix "Use Cases" -ActiveHref "usecases.html" -MainHtml ($usecases + "`n" + $contact)
New-Page -FileName "developers.html" -TitlePrefix "Developers" -ActiveHref "developers.html" -MainHtml ($developers + "`n" + $contact)
New-Page -FileName "onboarding.html" -TitlePrefix "Onboarding" -ActiveHref "onboarding.html" -MainHtml ($onboarding + "`n" + $contact)
New-Page -FileName "company.html" -TitlePrefix "Company" -ActiveHref "company.html" -MainHtml ($company + "`n" + $contact)

Write-Host "Created multi-page Aracore site."
