#!/usr/bin/env node
const { convert } = require('pdf2pic');
const fs = require('fs');
const path = require('path');

const pdfPath = path.join(__dirname, '../public/Alcovia_Brochure.pdf');
const outputDir = path.join(__dirname, '../public/brochure-pages');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const options = {
  density: 300,
  saveFilename: 'Alcovia_Brochure',
  savePath: outputDir,
  format: 'jpeg',
  quality: 95,
  width: 2481, // A4 at 300 DPI
  height: 3507,
};

async function convertPdf() {
  try {
    console.log('Starting PDF conversion with pdf2pic...');
    console.log(`PDF: ${pdfPath}`);
    console.log(`Output: ${outputDir}`);
    console.log(`Resolution: 2481x3507 (300 DPI A4) | Quality: 95%`);

    // Get PDF info first
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');

    console.log('\nAttempting conversion...');
    const result = await convert({
      ...options,
      page: null, // All pages
    })(pdfPath);

    console.log('\n✓ Conversion successful!');
    result.forEach((file, idx) => {
      const stats = fs.statSync(file.path);
      console.log(`  Page ${idx + 1}: ${file.name} (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
    });

  } catch (err) {
    console.error('Error during conversion:', err.message);
    process.exit(1);
  }
}

convertPdf();
