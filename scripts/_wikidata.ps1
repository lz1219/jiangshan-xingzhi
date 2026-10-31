<#
.SYNOPSIS
  按人名查 Wikidata，输出 QID / CBDB ID / 生卒 / 籍贯。

.DESCRIPTION
  做行迹考据的第一步：先拿到结构化的事实骨架，再去 CBDB / 史传核细节。
  Wikidata 是 CC0，且带 CBDB 人物 ID（P497），可作通往学术库的桥。
  详见 docs/sources.md。

  需要代理（本机 github/wikidata 直连不通）。

.EXAMPLE
  pwsh scripts/_wikidata.ps1 -Name 蒋捷
  pwsh scripts/_wikidata.ps1 -Name 苏轼 -Limit 5
#>
param(
  [Parameter(Mandatory = $true)][string]$Name,
  [string]$Lang = 'zh',
  [int]$Limit = 3,
  [string]$Proxy = 'http://127.0.0.1:7897'
)

$ErrorActionPreference = 'Stop'
$ua = @{ 'User-Agent' = 'jiangshan-xingzhi/1.0 (research)' }

function Get-Json($url) {
  return Invoke-RestMethod -Uri $url -Headers $ua -Proxy $Proxy -TimeoutSec 30
}

$api = 'https://www.wikidata.org/w/api.php'
$searchUrl = '{0}?action=wbsearchentities&search={1}&language={2}&format=json&limit={3}' -f `
  $api, [uri]::EscapeDataString($Name), $Lang, $Limit
$found = (Get-Json $searchUrl).search

if (-not $found) {
  Write-Output "未找到：$Name"
  exit 1
}

$ids = ($found | ForEach-Object { $_.id }) -join '|'
$entUrl = '{0}?action=wbgetentities&ids={1}&props=claims|labels|descriptions&languages=zh|en&format=json' -f $api, $ids
$entities = (Get-Json $entUrl).entities

function Get-Claim($entity, $prop) {
  $c = $entity.claims.$prop
  if (-not $c) { return $null }
  return $c[0].mainsnak.datavalue.value
}

function Format-Time($v) {
  if (-not $v -or -not $v.time) { return $null }
  # +1245-01-01T00:00:00Z → 1245（含公元前处理）
  if ($v.time -match '^([+-])(\d{4})') {
    $year = [int]$Matches[2]
    if ($Matches[1] -eq '-') { return "前$year" }
    return "$year"
  }
  return $v.time
}

foreach ($id in ($found | ForEach-Object { $_.id })) {
  $e = $entities.$id
  if (-not $e) { continue }

  $born = Format-Time (Get-Claim $e 'P569')
  $died = Format-Time (Get-Claim $e 'P570')
  $cbdb = Get-Claim $e 'P497'
  $placeId = (Get-Claim $e 'P19').id

  $placeLabel = ''
  if ($placeId) {
    try {
      $pUrl = '{0}?action=wbgetentities&ids={1}&props=labels&languages=zh&format=json' -f $api, $placeId
      $p = Get-Json $pUrl
      $placeLabel = $p.entities.$placeId.labels.zh.value
    } catch { $placeLabel = $placeId }
  }

  Write-Output '────────────────────────────────────────'
  Write-Output ("{0}  {1}［{2}］" -f $id, $e.labels.zh.value, $e.labels.en.value)
  if ($e.descriptions.en) { Write-Output ("  描述   : " + $e.descriptions.en.value) }
  Write-Output ("  生卒   : {0} — {1}" -f $(if ($born) { $born } else { '?' }), $(if ($died) { $died } else { '?' }))
  Write-Output ("  籍贯   : {0}" -f $(if ($placeLabel) { $placeLabel } else { '（无）' }))
  Write-Output ("  CBDB   : {0}" -f $(if ($cbdb) { $cbdb } else { '（无）' }))
}

Write-Output '────────────────────────────────────────'
Write-Output '提示：生卒若有异说，去 CBDB 与年谱核；两说不裁决，并列写入数据。'
