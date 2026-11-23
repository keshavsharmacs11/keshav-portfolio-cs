$ErrorActionPreference = 'Stop'

# Resolve the portfolio root from this script's location or the current directory.
# This works whether the ZIP is extracted directly into the project or into a child folder.
$startPaths = @((Split-Path -Parent $MyInvocation.MyCommand.Path), (Get-Location).Path)
$projectRoot = $null
foreach ($start in $startPaths) {
  $candidate = [System.IO.DirectoryInfo]::new($start)
  for ($depth = 0; $depth -lt 7 -and $null -ne $candidate; $depth++) {
    $componentsPath = Join-Path $candidate.FullName 'src\components'
    $packagePath = Join-Path $candidate.FullName 'package.json'
    if ((Test-Path -LiteralPath $componentsPath) -and (Test-Path -LiteralPath $packagePath)) {
      $projectRoot = $candidate.FullName
      break
    }
    $candidate = $candidate.Parent
  }
  if ($projectRoot) { break }
}

if (-not $projectRoot) {
  throw 'Could not locate the portfolio project. Extract this package inside D:\portfolio-ks (the folder containing package.json and src), then run INSTALL-PORTFOLIO-CLEANUP.cmd.'
}

$backupRoot = Join-Path $projectRoot ('portfolio-cleanup-backup-' + (Get-Date -Format 'yyyyMMdd-HHmmss'))
$changedFiles = New-Object System.Collections.Generic.List[string]
$unchangedFiles = New-Object System.Collections.Generic.List[string]

function Replace-Regex {
  param(
    [Parameter(Mandatory=$true)][string]$Text,
    [Parameter(Mandatory=$true)][string]$Pattern,
    [AllowEmptyString()][string]$Replacement = ''
  )
  return [regex]::Replace($Text, $Pattern, $Replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)
}

function Update-ProjectFile {
  param(
    [Parameter(Mandatory=$true)][string]$RelativePath,
    [Parameter(Mandatory=$true)][scriptblock]$Transform
  )

  $path = Join-Path $projectRoot $RelativePath
  if (-not (Test-Path -LiteralPath $path)) {
    Write-Host "Skipped (file not found): $RelativePath" -ForegroundColor DarkYellow
    return
  }

  $original = [System.IO.File]::ReadAllText($path)
  $updated = & $Transform $original

  if ($updated -eq $original) {
    $unchangedFiles.Add($RelativePath)
    Write-Host "No matching decorative display found (or already clean): $RelativePath" -ForegroundColor DarkGray
    return
  }

  $backupPath = Join-Path $backupRoot $RelativePath
  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $backupPath) | Out-Null
  Copy-Item -LiteralPath $path -Destination $backupPath -Force
  [System.IO.File]::WriteAllText($path, $updated, [System.Text.UTF8Encoding]::new($false))
  $changedFiles.Add($RelativePath)
  Write-Host "Updated: $RelativePath" -ForegroundColor Green
}

# 1) Selected Work: section serial, current/total carousel counter, card and modal serials.
Update-ProjectFile 'src\components\selected-work.tsx' {
  param($text)
  $text = Replace-Regex $text '(?m)^\s*const indexRef = useRef<HTMLSpanElement>\(null\);\r?\n' ''
  $text = Replace-Regex $text '(?m)^\s*let nearest = 0;\r?\n\s*let closest = Number\.POSITIVE_INFINITY;\r?\n' ''
  $text = Replace-Regex $text '(?m)^\s*if \(distance < closest\) \{\r?\n\s*closest = distance;\r?\n\s*nearest = index;\r?\n\s*\}\r?\n' ''
  $text = Replace-Regex $text '(?m)^\s*if \(indexRef\.current\) indexRef\.current\.textContent = String\(nearest \+ 1\)\.padStart\(2, "0"\);\r?\n' ''
  $text = Replace-Regex $text '<span className="work-reel-count">\s*<span ref=\{indexRef\}>.*?</span>\s*/\s*\{String\(visibleProjects\.length\)\.padStart\(2, "0"\)\}\s*</span>' ''
  $text = Replace-Regex $text '(<span className="section-kicker">\s*<i\s*/>\s*)01\s*/\s*(SELECTED WORK)' '$1$2'
  $text = Replace-Regex $text '<span className="project-card__topline"><span>\{project\.number\}\s*/\s*\{project\.status\}</span>' '<span className="project-card__topline"><span>{project.status}</span>'
  $text = Replace-Regex $text '<span>\{activeProject\.number\}\s*/\s*\{activeProject\.status\}</span>' '<span>{activeProject.status}</span>'
  return $text
}

# 2) Focus Areas: section serial and capability-card sequence numbers.
Update-ProjectFile 'src\components\capabilities-section.tsx' {
  param($text)
  $text = Replace-Regex $text '(<span className="section-kicker">\s*<i\s*/>\s*)02\s*/\s*(FOCUS AREAS)' '$1$2'
  $text = Replace-Regex $text '<span>\s*\{item\.number\}\s*</span>' ''
  return $text
}

# 3) About / Skills: section serials, skill-card serials, and duplicate resume link.
Update-ProjectFile 'src\components\about-section.tsx' {
  param($text)
  $text = Replace-Regex $text '(<span className="section-kicker">\s*<i\s*/>\s*)03\s*/\s*(THE PERSON BEHIND THE PIXELS)' '$1$2'
  $text = Replace-Regex $text '(<span className="section-kicker">\s*<i\s*/>\s*)04\s*/\s*(TECHNICAL SKILLS)' '$1$2'
  $text = Replace-Regex $text '\s*<span className="skill-group__number">\{group\.number\}</span>' ''
  $text = Replace-Regex $text '\s*\{profile\.resumeUrl\.trim\(\)\s*&&\s*\(\s*<a\s+className="about-resume-link".*?</a>\s*\)\s*\}' ''
  return $text
}

# 4) Contact section serial.
Update-ProjectFile 'src\components\contact-section.tsx' {
  param($text)
  $text = Replace-Regex $text '(<span className="section-kicker">\s*<i\s*/>\s*)05\s*/\s*(CONTACT)' '$1$2'
  return $text
}

# 5) Remove duplicate resume CTA from the desktop hero (navbar remains the desktop CTA).
Update-ProjectFile 'src\components\hero-section.tsx' {
  param($text)
  $text = Replace-Regex $text '\s*\{profile\.resumeUrl\s*&&\s*<m\.a\s+href=\{profile\.resumeUrl\}\s+download\s+className="button button--resume"[^>]*>.*?</m\.a>\s*\}' ''
  return $text
}

# 6) Remove duplicate resume CTA from the phone hero (the responsive navbar retains its own link).
Update-ProjectFile 'src\components\mobile-hero.tsx' {
  param($text)
  $text = Replace-Regex $text '\s*<m\.a\s+href=\{profile\.resumeUrl\}\s+download\s+className="mobile-hero__resume"[^>]*>.*?</m\.a>\s*' "`r`n"
  return $text
}

# 7) Remove the numbered mini-label on the layered hero artwork.
Update-ProjectFile 'src\components\hero-visual.tsx' {
  param($text)
  $text = Replace-Regex $text '\s*<div className="hero-project-index" aria-hidden="true">.*?</div>' ''
  return $text
}

# 8) Navbar: support the original global-class header and the CSS-module variant.
# The latest embedded glass-navbar version has no nav indices already, so it stays unchanged.
Update-ProjectFile 'src\components\site-header.tsx' {
  param($text)
  $text = Replace-Regex $text '<span className="nav-link__index">.*?</span>\s*' ''
  $text = Replace-Regex $text '<span className=\{styles\.navIndex\}>.*?</span>\s*' ''
  $text = Replace-Regex $text '<span className=\{styles\.mobileIndex\}>.*?</span>\s*' ''
  $text = Replace-Regex $text '<span>\s*0\{index \+ 1\}\s*</span>\s*' ''
  return $text
}

# 9) Keep the remaining GitHub action full width in the phone hero after its second CTA is removed.
Update-ProjectFile 'src\app\mobile-hero-v9.css' {
  param($text)
  if ($text -notmatch 'PORTFOLIO-CLEANUP: mobile hero single action row') {
    $text += "`r`n`r`n/* PORTFOLIO-CLEANUP: mobile hero single action row */`r`n@media (max-width: 760px) { .mobile-hero__actions { grid-template-columns: 1fr; } .mobile-hero__github { grid-column: 1 / -1; } }`r`n"
  }
  return $text
}

# 10) Hide the oversized WORK / 01—07 decorative watermark without touching project data.
Update-ProjectFile 'src\app\globals.css' {
  param($text)
  if ($text -notmatch 'PORTFOLIO-CLEANUP: hide serial watermark') {
    $text += "`r`n`r`n/* PORTFOLIO-CLEANUP: hide serial watermark */`r`n.work-section::before { content: none !important; }`r`n"
  }
  return $text
}

Write-Host ''
Write-Host 'PORTFOLIO CLEANUP FINISHED' -ForegroundColor Cyan
Write-Host "Project: $projectRoot"
Write-Host 'Removed decorative section serials, card serials, skill/capability numbers, hero artwork numbering, slider counter and duplicate hero/About resume buttons.'
Write-Host 'Preserved factual project/live-site totals, project data keys, education dates, version values and the navbar resume link.'
if ($changedFiles.Count -gt 0) {
  Write-Host "Backup folder: $backupRoot" -ForegroundColor Yellow
  Write-Host 'Updated files:'
  $changedFiles | ForEach-Object { Write-Host "  - $_" }
} else {
  Write-Host 'No files changed. The project may already be cleaned or may have different component markup.' -ForegroundColor DarkYellow
}
Write-Host ''
Write-Host 'Restart the development server and review desktop and mobile layouts before deploying.' -ForegroundColor Cyan
