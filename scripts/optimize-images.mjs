import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.resolve(__dirname, "../public/images");

async function* getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

async function optimizeImages() {
  console.log("=== STARTING BATCH IMAGE OPTIMIZATION ===");
  console.log(`Scanning: ${IMAGES_DIR}\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let filesProcessed = 0;

  for await (const filePath of getFiles(IMAGES_DIR)) {
    const ext = path.extname(filePath).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

    const stats = await fs.stat(filePath);
    const originalSize = stats.size;
    totalOriginal += originalSize;

    const relPath = path.relative(IMAGES_DIR, filePath);

    try {
      const buffer = await fs.readFile(filePath);

      let optimizedBuffer;
      if (ext === ".jpg" || ext === ".jpeg") {
        optimizedBuffer = await sharp(buffer)
          .jpeg({ quality: 82, mozjpeg: true, progressive: true })
          .toBuffer();
      } else if (ext === ".png") {
        optimizedBuffer = await sharp(buffer)
          .png({ quality: 85, compressionLevel: 9, adaptiveFiltering: true })
          .toBuffer();
      }

      // Only overwrite if smaller
      if (optimizedBuffer && optimizedBuffer.length < originalSize) {
        await fs.writeFile(filePath, optimizedBuffer);
        const saved = ((originalSize - optimizedBuffer.length) / 1024).toFixed(1);
        const percent = (((originalSize - optimizedBuffer.length) / originalSize) * 100).toFixed(1);
        console.log(`✓ Optimized: ${relPath} | ${(originalSize / 1024).toFixed(1)} KB -> ${(optimizedBuffer.length / 1024).toFixed(1)} KB (-${saved} KB, -${percent}%)`);
        totalOptimized += optimizedBuffer.length;
      } else {
        console.log(`- Kept: ${relPath} | ${(originalSize / 1024).toFixed(1)} KB (already optimal)`);
        totalOptimized += originalSize;
      }

      // Also generate WebP companion file
      const webpPath = filePath.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      const webpBuffer = await sharp(buffer)
        .webp({ quality: 80, effort: 5 })
        .toBuffer();
      await fs.writeFile(webpPath, webpBuffer);

      filesProcessed++;
    } catch (err) {
      console.error(`✗ Error processing ${relPath}:`, err.message);
      totalOptimized += originalSize;
    }
  }

  const savedTotal = ((totalOriginal - totalOptimized) / (1024 * 1024)).toFixed(2);
  const percentTotal = (((totalOriginal - totalOptimized) / totalOriginal) * 100).toFixed(1);

  console.log("\n=== OPTIMIZATION SUMMARY ===");
  console.log(`Files Processed: ${filesProcessed}`);
  console.log(`Original Total Size: ${(totalOriginal / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Optimized Total Size: ${(totalOptimized / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Net Savings: ${savedTotal} MB (${percentTotal}% reduction)\n`);
}

optimizeImages().catch(console.error);
