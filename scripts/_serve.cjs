#!/usr/bin/env node
/**
 * 本地静态服务器（改造工作用，零依赖）
 *
 *   node scripts/_serve.cjs           # 默认 http://127.0.0.1:5199/
 *   node scripts/_serve.cjs 8080      # 指定端口
 *
 * 基线是纯静态站点（无构建、无模块），因此普通静态服务即可；
 * 带 ?v= 的缓存戳在本地会被忽略（no-store），不会干扰调试。
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.argv[2] || process.env.PORT || 5199);
const HOST = '127.0.0.1';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.ico': 'image/x-icon',
};

http
  .createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel === '/' || rel === '') rel = '/index.html';
    const file = path.join(ROOT, rel);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end('forbidden');
      return;
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('not found: ' + rel);
        return;
      }
      res.writeHead(200, {
        'Content-Type': MIME[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store',
      });
      res.end(data);
    });
  })
  .listen(PORT, HOST, () => {
    console.log(`江山时序（改造版）: http://${HOST}:${PORT}/`);
    console.log(`  苏轼行迹      http://${HOST}:${PORT}/?person=sushi`);
    console.log(`  诸葛亮行迹    http://${HOST}:${PORT}/?person=zhugeliang`);
    console.log(`  张骞行迹      http://${HOST}:${PORT}/?person=zhangqian`);
  });
