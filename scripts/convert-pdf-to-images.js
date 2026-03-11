#!/usr/bin/env node
const PDFImage = require('pdf-image').PDFImage;
const fs = require('fs');
const path = require('path');

const pdfPath = path.join(__dirname, '../public/Alcovia_Brochure.pdf');
const outputDir = path.join(__dirname, '../public/brochure-pages');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Configuration for high-quality output
const pdfImage = new PDFImage(pdfPath, {
  graphicsMagick: false, // Use ImageMagick instead (better quality)
  density: 300, // DPI for output
  quality: 95, // JPEG quality 0-100
  format: 'jpeg',
  outputFormat: 'jpeg',
  savePath: outputDir,
  convertOptions: {
    '-quality': '95',
    '-density': '300x300',
  }
});

async function convertPages() {
  try {
    console.log('Starting PDF to image conversion...');
    console.log(`PDF: ${pdfPath}`);
    console.log(`Output: ${outputDir}`);
    console.log(`DPI: 300 | Quality: 95%`);

    // Get number of pages
    const pageCount = await pdfImage.numberOfPages();
    console.log(`Total pages: ${pageCount}`);

    // Convert first 10 pages as sample
    console.log('\nConverting first 10 pages as sample...');
    for (let i = 1; i <= Math.min(10, pageCount); i++) {
      console.log(`Converting page ${i}/${Math.min(10, pageCount)}...`);
      try {
        await pdfImage.convertPage(i - 1);
        const outputFile = path.join(outputDir, `Alcovia_Brochure-${i}.jpg`);
        const stats = fs.statSync(outputFile);
        console.log(`  ✓ Page ${i} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
      } catch (err) {
        console.error(`  ✗ Page ${i} failed:`, err.message);
      }
    }

    console.log('\nSample conversion complete!');
    console.log(`Check ${outputDir} for results.`);

  } catch (err) {
    console.error('Error during conversion:', err);
    process.exit(1);
  }
}

convertPages();
