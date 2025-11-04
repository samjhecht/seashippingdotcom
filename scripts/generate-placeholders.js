#!/usr/bin/env node

/**
 * Generate placeholder images for all sections
 * Uses sharp to create colored placeholder images with text
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../public/images');

// Ensure all directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Generate a colored placeholder with text
async function generatePlaceholder(outputPath, width, height, color, text) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="32"
        fill="#ffffff"
        text-anchor="middle"
        dominant-baseline="middle"
      >${text}</text>
    </svg>
  `;

  const buffer = Buffer.from(svg);

  try {
    await sharp(buffer)
      .resize(width, height)
      .jpeg({ quality: 85 })
      .toFile(outputPath);
    console.log(`✓ Created: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to create ${outputPath}:`, error.message);
  }
}

// Generate a colored placeholder PNG (for logos/certifications)
async function generatePngPlaceholder(outputPath, width, height, color, text) {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text
        x="50%"
        y="50%"
        font-family="Arial, sans-serif"
        font-size="24"
        font-weight="bold"
        fill="#ffffff"
        text-anchor="middle"
        dominant-baseline="middle"
      >${text}</text>
    </svg>
  `;

  const buffer = Buffer.from(svg);

  try {
    await sharp(buffer)
      .resize(width, height)
      .png()
      .toFile(outputPath);
    console.log(`✓ Created: ${outputPath}`);
  } catch (error) {
    console.error(`✗ Failed to create ${outputPath}:`, error.message);
  }
}

async function main() {
  console.log('🎨 Generating placeholder images...\n');

  // Hero image
  console.log('📸 Generating hero images...');
  ensureDir(path.join(baseDir, 'hero'));
  await generatePlaceholder(
    path.join(baseDir, 'hero/hero-shipping.jpg'),
    1920,
    1080,
    '#0066cc',
    'Global Shipping'
  );

  // Service images
  console.log('\n📦 Generating service images...');
  ensureDir(path.join(baseDir, 'services'));
  const services = [
    { name: 'ocean-freight', text: 'Ocean Freight', color: '#004080' },
    { name: 'automobiles', text: 'Automobiles', color: '#cc3300' },
    { name: 'household-goods', text: 'Household Goods', color: '#669900' },
    { name: 'break-bulk', text: 'Break Bulk', color: '#ff6600' },
    { name: 'project-cargo', text: 'Project Cargo', color: '#9933cc' },
    { name: 'hazmat', text: 'Hazmat', color: '#cc0000' },
    { name: 'temperature-controlled', text: 'Temperature', color: '#0099cc' },
  ];

  for (const service of services) {
    await generatePlaceholder(
      path.join(baseDir, `services/${service.name}.jpg`),
      800,
      600,
      service.color,
      service.text
    );
  }

  // Certification badges
  console.log('\n🏆 Generating certification badges...');
  ensureDir(path.join(baseDir, 'certifications'));
  const certifications = [
    { name: 'ctpat', text: 'C-TPAT', color: '#003366' },
    { name: 'fmc', text: 'FMC', color: '#004080' },
    { name: 'iata', text: 'IATA', color: '#0066cc' },
    { name: 'wca', text: 'WCA', color: '#0080ff' },
    { name: 'ncbfaa', text: 'NCBFAA', color: '#3399ff' },
    { name: 'iso', text: 'ISO 9001', color: '#0052cc' },
  ];

  for (const cert of certifications) {
    await generatePngPlaceholder(
      path.join(baseDir, `certifications/${cert.name}.png`),
      200,
      200,
      cert.color,
      cert.text
    );
  }

  // Logo images
  console.log('\n🎯 Generating logo images...');
  ensureDir(path.join(baseDir, 'logo'));
  await generatePngPlaceholder(
    path.join(baseDir, 'logo/logo.png'),
    240,
    60,
    '#0066cc',
    'SEA SHIPPING'
  );
  await generatePngPlaceholder(
    path.join(baseDir, 'logo/icon.png'),
    64,
    64,
    '#0066cc',
    'SS'
  );

  // Office images
  console.log('\n🏢 Generating office images...');
  ensureDir(path.join(baseDir, 'offices'));
  const offices = [
    { code: 'nyc', city: 'New York', color: '#336699' },
    { code: 'lax', city: 'Los Angeles', color: '#6699cc' },
    { code: 'sea', city: 'Seattle', color: '#339966' },
    { code: 'chs', city: 'Charleston', color: '#996633' },
    { code: 'orf', city: 'Norfolk', color: '#663399' },
    { code: 'sav', city: 'Savannah', color: '#cc6633' },
    { code: 'hou', city: 'Houston', color: '#cc3366' },
    { code: 'mia', city: 'Miami', color: '#3399cc' },
  ];

  for (const office of offices) {
    await generatePlaceholder(
      path.join(baseDir, `offices/${office.code}.jpg`),
      800,
      600,
      office.color,
      office.city
    );
  }

  // Placeholder images
  console.log('\n🖼️  Generating generic placeholders...');
  ensureDir(path.join(baseDir, 'placeholders'));
  await generatePlaceholder(
    path.join(baseDir, 'placeholders/service-placeholder.jpg'),
    800,
    600,
    '#666666',
    'Service Image'
  );
  await generatePlaceholder(
    path.join(baseDir, 'placeholders/office-placeholder.jpg'),
    800,
    600,
    '#888888',
    'Office Image'
  );

  console.log('\n✅ All placeholder images generated successfully!');
  console.log('\nNext steps:');
  console.log('1. Replace placeholders with actual images');
  console.log('2. Run npm run optimize-images to generate responsive sizes');
}

main().catch((error) => {
  console.error('❌ Error generating placeholders:', error);
  process.exit(1);
});
