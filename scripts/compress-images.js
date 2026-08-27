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

const files = fs.readdirSync(imageDir).filter(f =>
  /\.(jpe?g|png)$/i.test(f)
);

if (files.length === 0) {
  console.log('📸 No images to compress.');
  process.exit(0);
}

console.log(`📸 Found ${files.length} images to process...`);

const QUALITY = 70;
const MAX_WIDTH = 500;

files.forEach(async (file) => {
  const inputPath = path.join(imageDir, file);
  const ext = path.extname(file).toLowerCase();
  const name = path.basename(file, ext);

  try {
    const pipeline = sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true });

    // Generate WebP
    const webpPath = path.join(imageDir, `${name}.webp`);
    await pipeline.clone().webp({ quality: QUALITY }).toFile(webpPath);

    // Generate JPEG using a temporary file to avoid input/output conflict
    const tempJpg = path.join(imageDir, `_temp_${name}.jpg`);
    await pipeline.clone().jpeg({ quality: QUALITY, progressive: true }).toFile(tempJpg);

    // Replace original JPEG if it was JPEG, otherwise just keep the new .jpg
    if (ext === '.jpg' || ext === '.jpeg') {
      fs.unlinkSync(inputPath);
      fs.renameSync(tempJpg, inputPath);
    } else {
      // For PNG, we keep the original PNG and also create a .jpg
      fs.renameSync(tempJpg, path.join(imageDir, `${name}.jpg`));
    }

    console.log(`✅ Optimised: ${file} → ${name}.webp & ${name}.jpg (Q=${QUALITY})`);
  } catch (err) {
    console.error(`❌ Could not process ${file}:`, err.message);
  }
});

console.log('🎉 All done!');