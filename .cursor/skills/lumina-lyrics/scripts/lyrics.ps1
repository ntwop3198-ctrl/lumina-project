# Lumina lyrics finder: scan a lyrics root for .docx/.txt by title, id, or series.
param(
  [Parameter(Mandatory = $true)][ValidateSet('Find', 'Read')][string]$Action,
  [Parameter(Mandatory = $true)][string]$Root,
  [string]$Query = '',
  [string]$RelativePath = '',
  [string]$Source = ''
)

$ErrorActionPreference = 'Stop'
$rootPath = (Resolve-Path -LiteralPath $Root).Path
$scanRoot = if ($Source) { Join-Path $rootPath $Source } else { $rootPath }
if (-not (Test-Path -LiteralPath $scanRoot)) { throw "歌词目录不存在：$scanRoot" }

function Normalize([string]$s) {
  return ([string]$s).Normalize([Text.NormalizationForm]::FormKC).ToLowerInvariant() -replace '[\s_.,，、。!！?？:：;；·・\-–—~～()（）\[\]【】''"`「」『』“”‘’]', ''
}

if ($Action -eq 'Find') {
  if (-not $Query) { throw 'Find 需要 -Query' }
  $q = Normalize $Query
  $hits = Get-ChildItem -LiteralPath $scanRoot -Recurse -File -Include *.docx,*.txt |
    Where-Object { (Normalize $_.BaseName).Contains($q) -or (Normalize $_.FullName.Substring($rootPath.Length)).Contains($q) } |
    ForEach-Object {
      [pscustomobject]@{
        RelativePath = $_.FullName.Substring($rootPath.Length).TrimStart('\', '/')
        Name         = $_.Name
        LastWrite    = $_.LastWriteTime.ToString('yyyy-MM-dd HH:mm')
      }
    }
  if (-not $hits) { Write-Output "未找到匹配「$Query」的歌词文件"; return }
  $hits | Format-Table -AutoSize | Out-String -Width 200
  return
}

if (-not $RelativePath) { throw 'Read 需要 -RelativePath' }
$file = Join-Path $rootPath $RelativePath
if (-not (Test-Path -LiteralPath $file)) { throw "文件不存在：$RelativePath" }
$ext = [IO.Path]::GetExtension($file).ToLowerInvariant()
if ($ext -eq '.txt') {
  Get-Content -LiteralPath $file -Encoding UTF8 -Raw
  return
}
if ($ext -ne '.docx') { throw "不支持的格式：$ext" }

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead($file)
try {
  $entry = $zip.GetEntry('word/document.xml')
  if (-not $entry) { throw 'docx 里没有 word/document.xml' }
  $sr = New-Object IO.StreamReader($entry.Open())
  $xml = $sr.ReadToEnd()
  $sr.Close()
} finally { $zip.Dispose() }
$text = [regex]::Replace($xml, '</w:p>', "`n")
$text = [regex]::Replace($text, '<[^>]+>', '')
$text = [System.Net.WebUtility]::HtmlDecode($text)
Write-Output $text
