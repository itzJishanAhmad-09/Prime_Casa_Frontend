// scripts/compress-images.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, '../public/assets/images');

if (!fs.existsSync(imageDir)) {
  console.log('❌ Image directory not found – skipping.');
  process.exit(0);
}

// Lower quality = smaller files. 60 is a good balance for real estate photos.
const WEBP_QUALITY = 60;
const JPEG_QUALITY = 60;
const MAX_WIDTH = 800; // Increased from 500 — modern devices need larger thumbs

const allFiles = fs.readdirSync(imageDir).filter(f =>
  /\.(jpe?g|png|webp)$/i.test(f) &&
  !f.startsWith('_temp_') &&
  f !== 'placeholder.jpg' && f !== 'placeholder.webp'
);

if (allFiles.length === 0) {
  console.log('📸 No images to compress.');
  process.exit(0);
}

console.log(`📸 Found ${allFiles.length} images to process...`);

// Process each file sequentially to avoid disk contention
(async () => {
  let processed = 0;
  for (const file of allFiles) {
    const inputPath = path.join(imageDir, file);
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    try {
      const pipeline = sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true });

      // Generate or overwrite WebP
      const webpPath = path.join(imageDir, `${name}.webp`);
      await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);

      // For JPEG/PNG sources, also update the JPEG fallback
      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const tempJpg = path.join(imageDir, `_temp_${name}.jpg`);
        await pipeline.clone().jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(tempJpg);

        if (ext === '.jpg' || ext === '.jpeg') {
          fs.unlinkSync(inputPath);
          fs.renameSync(tempJpg, inputPath);
        } else {
          // PNG → keep original and add .jpg
          fs.renameSync(tempJpg, path.join(imageDir, `${name}.jpg`));
        }
      }

      processed++;
      const newSize = fs.statSync(webpPath).size;
      console.log(`✅ ${file} → ${name}.webp (${(newSize / 1024).toFixed(1)} KiB, Q=${WEBP_QUALITY})`);
    } catch (err) {
      console.error(`❌ Could not process ${file}:`, err.message);
    }
  }

  // Clean up any leftover temp files
  fs.readdirSync(imageDir)
    .filter(f => f.startsWith('_temp_'))
    .forEach(f => {
      try { fs.unlinkSync(path.join(imageDir, f)); } catch {}
    });

  console.log(`🎉 Done! ${processed} images optimised (WebP Q=${WEBP_QUALITY}, JPEG Q=${JPEG_QUALITY}, maxW=${MAX_WIDTH})`);
})();