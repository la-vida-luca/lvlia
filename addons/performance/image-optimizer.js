#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = process.argv[2] || path.resolve(__dirname, '../../assets');
const outputDir = process.argv[3] || path.resolve(__dirname, '../assets/optimized');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const exts = ['.jpg', '.jpeg', '.png'];

const files = fs.readdirSync(inputDir).filter((file) => exts.includes(path.extname(file).toLowerCase()));

await Promise.all(files.map(async (file) => {
  const inputPath = path.join(inputDir, file);
  const base = path.parse(file).name;
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(path.join(outputDir, `${base}.webp`));
  await sharp(inputPath)
    .avif({ quality: 65 })
    .toFile(path.join(outputDir, `${base}.avif`));
  console.log(`Optimisé ${file}`);
}));
