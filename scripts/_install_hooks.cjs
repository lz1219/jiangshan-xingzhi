#!/usr/bin/env node
/**
 * 安装本地 git 钩子：pre-push 发布闸门。
 *
 * 背景：本仓库的 `git push origin main` 会同时触发
 *   1) Atlas Integrity CI（.github/workflows/ci.yml → scripts/validate_atlas.js）
 *   2) GitHub Pages 构建（线上立即更新）
 * 所以推送等于发布，不能每次改动都推。
 *
 * 用法：
 *   node scripts/_install_hooks.cjs          # 安装
 *   ALLOW_PUSH=1 git push                    # 确认后放行（PowerShell: $env:ALLOW_PUSH='1'; git push）
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HOOKS = path.join(ROOT, '.git', 'hooks');
const TARGET = path.join(HOOKS, 'pre-push');

const HOOK = `#!/bin/sh
# 发布闸门（由 scripts/_install_hooks.cjs 生成，不进版本库）
#
# 推送 main 会触发：Atlas Integrity CI + GitHub Pages 构建
# 因此推送 = 发布。发布前必须与用户确认。
#
# 确认后放行：
#   bash:        ALLOW_PUSH=1 git push
#   powershell:  $env:ALLOW_PUSH='1'; git push

if [ "$ALLOW_PUSH" = "1" ]; then
  echo "[pre-push] ALLOW_PUSH=1，放行推送"
  exit 0
fi

echo ""
echo "────────────────────────────────────────────────────────────"
echo "  已被 pre-push 闸门拦下：推送 main 等于发布。"
echo ""
echo "  这会触发两个自动流程："
echo "    1) Atlas Integrity CI —— node scripts/validate_atlas.js"
echo "    2) GitHub Pages 构建 —— 线上站点立即更新"
echo ""
echo "  请先与用户确认这次是否发布，然后："
echo "    PowerShell:  \\\$env:ALLOW_PUSH='1'; git push"
echo "    bash:        ALLOW_PUSH=1 git push"
echo "────────────────────────────────────────────────────────────"
echo ""
exit 1
`;

if (!fs.existsSync(HOOKS)) {
  console.error('未找到 .git/hooks，当前目录不是 git 仓库根目录？');
  process.exit(1);
}

fs.writeFileSync(TARGET, HOOK.replace(/\n/g, '\n'));
try {
  fs.chmodSync(TARGET, 0o755);
} catch {
  /* Windows 上 chmod 可能无效，忽略 */
}

console.log(`已安装 pre-push 闸门：${TARGET}`);
console.log('推送需显式放行：$env:ALLOW_PUSH=\'1\'; git push');
