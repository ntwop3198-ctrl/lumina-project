#!/usr/bin/env node
// Cross-platform lyrics finder for cloud agents (Linux). Same actions as lyrics.ps1.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const args = Object.fromEntries(process.argv.slice(2).reduce((acc, a, i, arr) => {
  if (!a.startsWith('--')) return acc;
  const next = arr[i + 1];
  acc.push([a.slice(2), next && !next.startsWith('--') ? next : true]);
  return acc;
}, []));

const action = String(args.action || '').toLowerCase();
const root = path.resolve(String(args.root || '.'));
const query = String(args.query || '');
const relativePath = String(args['relative-path'] || '');
const source = String(args.source || '');
const scanRoot = source ? path.join(root, source) : root;

const norm = (s) => String(s || '').normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(docx|txt)$/i.test(e.name)) out.push(p);
  }
  return out;
}

async function readDocx(file) {
  // Prefer jszip if present; otherwise unzip via system unzip.
  try {
    const require = createRequire(import.meta.url);
    const JSZip = require('jszip');
    const zip = await JSZip.loadAsync(fs.readFileSync(file));
    const xml = await zip.file('word/document.xml')?.async('string');
    return String(xml || '').replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, '');
  } catch {
    const { execFileSync } = await import('node:child_process');
    const xml = execFileSync('unzip', ['-p', file, 'word/document.xml'], { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
    return xml.replace(/<\/w:p>/g, '\n').replace(/<[^>]+>/g, '');
  }
}

if (!['find', 'read'].includes(action)) {
  console.error('Usage: node lyrics.mjs --action find|read --root <dir> [--query ...] [--relative-path ...] [--source ...]');
  process.exit(1);
}

if (action === 'find') {
  if (!query) { console.error('find 需要 --query'); process.exit(1); }
  const q = norm(query);
  const hits = walk(scanRoot)
    .map((abs) => ({ abs, rel: path.relative(root, abs).replace(/\\/g, '/'), name: path.basename(abs), mtime: fs.statSync(abs).mtime }))
    .filter((h) => norm(h.name).includes(q) || norm(h.rel).includes(q));
  if (!hits.length) { console.log(`未找到匹配「${query}」的歌词文件`); process.exit(0); }
  for (const h of hits) console.log(`${h.mtime.toISOString().slice(0, 16).replace('T', ' ')}  ${h.rel}`);
  process.exit(0);
}

if (!relativePath) { console.error('read 需要 --relative-path'); process.exit(1); }
const file = path.join(root, relativePath);
if (!fs.existsSync(file)) { console.error(`文件不存在：${relativePath}`); process.exit(1); }
if (/\.txt$/i.test(file)) console.log(fs.readFileSync(file, 'utf8'));
else console.log(await readDocx(file));
