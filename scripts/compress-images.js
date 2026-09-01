// scripts/compress-images.js
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, '../public/assets/images');
const videoDir = path.join(__dirname, '../public/assets/videos');

const WEBP_QUALITY = 60;
const JPEG_QUALITY = 60;
const MAX_WIDTH = 800;

// Function to process a directory
async function processDirectory(dir, folderName) {
  if (!fs.existsSync(dir)) {
    console.log(`❌ ${folderName} directory not found – skipping.`);
    return 0;
  }

  const allFiles = fs.readdirSync(dir).filter(f =>
    /\.(jpe?g|png)$/i.test(f) &&
    !f.startsWith('_temp_') &&
    f !== 'placeholder.jpg' && f !== 'placeholder.webp'
  );

  if (allFiles.length === 0) {
    console.log(`📸 No JPEG/PNG images to compress in ${folderName}.`);
    return 0;
  }

  console.log(`📸 Found ${allFiles.length} images to process in ${folderName}...`);
  let processed = 0;

  for (const file of allFiles) {
    const inputPath = path.join(dir, file);
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext);

    try {
      const pipeline = sharp(inputPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true });

      const webpPath = path.join(dir, `${name}.webp`);
      await pipeline.clone().webp({ quality: WEBP_QUALITY }).toFile(webpPath);

      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const tempJpg = path.join(dir, `_temp_${name}.jpg`);
        await pipeline.clone().jpeg({ quality: JPEG_QUALITY, progressive: true }).toFile(tempJpg);

        if (ext === '.jpg' || ext === '.jpeg') {
          fs.unlinkSync(inputPath);
          fs.renameSync(tempJpg, inputPath);
        } else {
          fs.renameSync(tempJpg, path.join(dir, `${name}.jpg`));
        }
      }

      processed++;
      const newSize = fs.statSync(webpPath).size;
      console.log(`✅ ${file} → ${name}.webp (${(newSize / 1024).toFixed(1)} KiB, Q=${WEBP_QUALITY})`);
    } catch (err) {
      console.error(`❌ Could not process ${file}:`, err.message);
    }
  }

  // Clean up temp files
  fs.readdirSync(dir)
    .filter(f => f.startsWith('_temp_'))
    .forEach(f => {
      try { fs.unlinkSync(path.join(dir, f)); } catch {}
    });

  return processed;
}

(async () => {
  console.log('🔄 Processing images folder...');
  const imagesProcessed = await processDirectory(imageDir, 'images');

  console.log('\n🔄 Processing videos folder...');
  const videosProcessed = await processDirectory(videoDir, 'videos');

  console.log(`\n🎉 Done! ${imagesProcessed + videosProcessed} images optimised total.`);
})();