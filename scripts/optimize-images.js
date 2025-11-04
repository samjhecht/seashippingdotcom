#!/usr/bin/env node

/**
 * Image Optimization Script
 * Generates multiple sizes and formats (WebP + JPEG) for responsive images
 * Usage: node scripts/optimize-images.js [directory]
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const SIZES = [640, 750, 828, 1080, 1200, 1920, 2048, 3840];
const QUALITY = {
  webp: 85,
  jpeg: 85,
  png: 90,
};

// Directories to process
const IMAGE_DIRS = [
  'hero',
  'services',
  'offices',
  'placeholders',
  // Note: certifications and logo are typically not optimized for responsive sizes
];

/**
 * Check if file is an image
 */
function isImageFile(filename) {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
  const ext = path.extname(filename).toLowerCase();
  return imageExtensions.includes(ext);
}

/**
 * Check if file is already a sized variant (e.g., image-640w.jpg)
 */
function isSizedVariant(filename) {
  return /-(640|750|828|1080|1200|1920|2048|3840)w\.(jpg|jpeg|webp)$/.test(
    filename
  );
}

/**
 * Get original image path (without size suffix)
 */
function getOriginalPath(filePath) {
  const dir = path.dirname(filePath);
  const filename = path.basename(filePath);
  const ext = path.extname(filename);
  const baseName = filename.replace(ext, '').replace(/-\d+w$/, '');
  return path.join(dir, baseName + ext);
}

/**
 * Optimize a single image and generate multiple sizes
 */
async function optimizeImage(inputPath, outputDir) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    const filename = path.basename(inputPath, path.extname(inputPath));

    console.log(`\n📸 Processing: ${inputPath}`);
    console.log(
      `   Original size: ${metadata.width}x${metadata.height} (${metadata.format})`
    );

    let generatedCount = 0;

    // Generate responsive sizes
    for (const size of SIZES) {
      // Only generate sizes smaller than or equal to original
      if (size <= metadata.width) {
        // Generate WebP version
        const webpPath = path.join(outputDir, `${filename}-${size}w.webp`);
        await image
          .clone()
          .resize(size, null, { withoutEnlargement: true })
          .webp({ quality: QUALITY.webp })
          .toFile(webpPath);

        // Generate JPEG version
        const jpegPath = path.join(outputDir, `${filename}-${size}w.jpg`);
        await image
          .clone()
          .resize(size, null, { withoutEnlargement: true })
          .jpeg({ quality: QUALITY.jpeg })
          .toFile(jpegPath);

        generatedCount += 2;
      }
    }

    console.log(`   ✓ Generated ${generatedCount} optimized images`);
    return generatedCount;
  } catch (error) {
    console.error(`   ✗ Error processing ${inputPath}:`, error.message);
    return 0;
  }
}

/**
 * Process all images in a directory
 */
async function processDirectory(dir) {
  console.log(`\n📁 Processing directory: ${dir}`);

  try {
    const files = await fs.readdir(dir);
    const imageFiles = files.filter(
      (file) => isImageFile(file) && !isSizedVariant(file)
    );

    if (imageFiles.length === 0) {
      console.log('   No images to process');
      return 0;
    }

    let totalGenerated = 0;
    for (const file of imageFiles) {
      const inputPath = path.join(dir, file);
      const count = await optimizeImage(inputPath, dir);
      totalGenerated += count;
    }

    return totalGenerated;
  } catch (error) {
    console.error(`   ✗ Error reading directory ${dir}:`, error.message);
    return 0;
  }
}

/**
 * Clean up old sized variants
 */
async function cleanupOldVariants(dir) {
  try {
    const files = await fs.readdir(dir);
    const variants = files.filter((file) => isSizedVariant(file));

    if (variants.length > 0) {
      console.log(`\n🧹 Cleaning up ${variants.length} old variants in ${dir}`);
      for (const file of variants) {
        await fs.unlink(path.join(dir, file));
      }
    }
  } catch (error) {
    // Directory might not exist yet
    console.log(`   Note: ${dir} does not exist or is empty`);
  }
}

/**
 * Get directory size
 */
async function getDirectorySize(dir) {
  try {
    const files = await fs.readdir(dir);
    let totalSize = 0;

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = await fs.stat(filePath);
      if (stats.isFile()) {
        totalSize += stats.size;
      }
    }

    return totalSize;
  } catch (error) {
    return 0;
  }
}

/**
 * Format bytes to human readable
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 Image Optimization Script');
  console.log('================================\n');

  const baseDir = path.join(__dirname, '../public/images');

  // Check if specific directory was provided
  const targetDir = process.argv[2];
  const dirsToProcess = targetDir
    ? [targetDir]
    : IMAGE_DIRS.filter((dir) => {
        const fullPath = path.join(baseDir, dir);
        return fs
          .access(fullPath)
          .then(() => true)
          .catch(() => false);
      });

  console.log('Configuration:');
  console.log(`  Sizes: ${SIZES.join(', ')}px`);
  console.log(`  Formats: WebP (${QUALITY.webp}%), JPEG (${QUALITY.jpeg}%)`);
  console.log(`  Directories: ${dirsToProcess.join(', ')}`);

  let totalImagesGenerated = 0;
  const processedDirs = [];

  for (const dir of IMAGE_DIRS) {
    const fullPath = path.join(baseDir, dir);

    // Check if directory exists
    try {
      await fs.access(fullPath);
    } catch {
      console.log(`\n⚠️  Skipping ${dir} (directory does not exist)`);
      continue;
    }

    // Clean up old variants first
    await cleanupOldVariants(fullPath);

    // Get size before
    const sizeBefore = await getDirectorySize(fullPath);

    // Process directory
    const count = await processDirectory(fullPath);
    totalImagesGenerated += count;

    // Get size after
    const sizeAfter = await getDirectorySize(fullPath);

    processedDirs.push({
      dir,
      count,
      sizeBefore,
      sizeAfter,
    });
  }

  // Print summary
  console.log('\n\n================================');
  console.log('📊 Optimization Summary');
  console.log('================================\n');

  for (const { dir, count, sizeBefore, sizeAfter } of processedDirs) {
    console.log(`${dir}:`);
    console.log(`  Generated: ${count} images`);
    console.log(`  Before: ${formatBytes(sizeBefore)}`);
    console.log(`  After: ${formatBytes(sizeAfter)}`);
    const diff = sizeAfter - sizeBefore;
    console.log(
      `  Change: ${diff > 0 ? '+' : ''}${formatBytes(diff)} (${((diff / sizeBefore) * 100).toFixed(1)}%)\n`
    );
  }

  console.log(`Total images generated: ${totalImagesGenerated}`);
  console.log('\n✅ Image optimization complete!');
  console.log('\nNext.js will automatically serve:');
  console.log('  - WebP to supporting browsers');
  console.log('  - JPEG as fallback for older browsers');
  console.log('  - Appropriate size based on viewport');
}

// Run the script
main().catch((error) => {
  console.error('\n❌ Error running optimization:', error);
  process.exit(1);
});
