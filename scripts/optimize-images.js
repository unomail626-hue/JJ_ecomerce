#!/usr/bin/env node
/**
 * Generates compressed .webp versions of every raster image in public/images.
 * Originals (.png/.jpg) are kept untouched — this only adds a smaller sibling
 * file. Re-run after adding new images; already up-to-date .webp files are
 * skipped unless --force is passed.
 *
 * Usage: node scripts/optimize-images.js [--force]
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const IMAGES_DIR = path.join(__dirname, "..", "public", "images");
const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg"]);
const FORCE = process.argv.includes("--force");

// Per-file tuning: how big the source actually needs to be for its largest
// on-site usage, and how much compression it can take before it looks bad.
// Flat-color/logo art can go higher quality (fewer artifacts on edges);
// photos compress well at a lower quality with no visible difference.
const DEFAULT_RULE = { maxWidth: 1600, quality: 78 };
const OVERRIDES = {
  "logo.png": { maxWidth: 256, quality: 90 },
  "jj_image.png": { maxWidth: 1000, quality: 85 },
};

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(0)}KB`;
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!SOURCE_EXT.has(ext)) return null;

  const srcPath = path.join(IMAGES_DIR, file);
  const destPath = path.join(IMAGES_DIR, file.slice(0, -ext.length) + ".webp");

  if (!FORCE && fs.existsSync(destPath)) {
    const srcStat = fs.statSync(srcPath);
    const destStat = fs.statSync(destPath);
    if (destStat.mtimeMs >= srcStat.mtimeMs) {
      return { file, skipped: true };
    }
  }

  const rule = OVERRIDES[file] || DEFAULT_RULE;
  const image = sharp(srcPath);
  const metadata = await image.metadata();

  if (metadata.width && metadata.width > rule.maxWidth) {
    image.resize({ width: rule.maxWidth });
  }

  await image.webp({ quality: rule.quality }).toFile(destPath);

  const before = fs.statSync(srcPath).size;
  const after = fs.statSync(destPath).size;
  return { file, before, after };
}

async function main() {
  const files = fs.readdirSync(IMAGES_DIR);
  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;

  for (const file of files) {
    const result = await optimize(file);
    if (!result) continue;

    if (result.skipped) {
      skipped++;
      continue;
    }

    totalBefore += result.before;
    totalAfter += result.after;
    const savedPct = (100 * (1 - result.after / result.before)).toFixed(0);
    console.log(
      `${result.file.padEnd(28)} ${formatBytes(result.before).padStart(8)} -> ${formatBytes(
        result.after
      ).padStart(8)}  (-${savedPct}%)`
    );
  }

  if (skipped) console.log(`\n${skipped} file(s) already up to date, skipped.`);
  if (totalBefore) {
    console.log(
      `\nTotal: ${formatBytes(totalBefore)} -> ${formatBytes(totalAfter)} (-${(
        100 * (1 - totalAfter / totalBefore)
      ).toFixed(0)}%)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
