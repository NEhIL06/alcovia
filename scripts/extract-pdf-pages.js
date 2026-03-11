#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');
const pdfjsLib = require('pdfjs-dist');

// Set up worker
pdfjsLib.GlobalWorkerOptions.workerSrc = path.join(
  require.resolve('pdfjs-dist'),
  '../build/pdf.worker.js'
);

const pdfPath = path.join(__dirname, '../public/Alcovia_Brochure.pdf');
const outputDir = path.join(__dirname, '../public/brochure-pages');

// Create output directory
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function extractPages() {
  try {
    console.log('Loading PDF...');
    const pdf = await pdfjsLib.getDocument({
      data: fs.readFileSync(pdfPath),
      useWorkerFetch: false,
    }).promise;

    const pageCount = pdf.numPages;
    console.log(`Total pages: ${pageCount}`);

    // Convert first 10 pages as sample
    const sampleCount = Math.min(10, pageCount);
    console.log(`\nExtracting first ${sampleCount} pages at high quality...`);

    const images = [];

    for (let pageNum = 1; pageNum <= sampleCount; pageNum++) {
      process.stdout.write(`Page ${pageNum}/${sampleCount}... `);

      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2.0 }); // 2x scale for high quality

      const canvas = createCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');

      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;

      const filename = `Alcovia_Brochure-${pageNum}.jpg`;
      const filepath = path.join(outputDir, filename);

      // Write JPEG with high quality
      const stream = canvas.createJPEGStream({ quality: 0.95, progressive: true });
      const file = fs.createWriteStream(filepath);

      await new Promise((resolve, reject) => {
        stream.pipe(file);
        stream.on('end', resolve);
        stream.on('error', reject);
        file.on('error', reject);
      });

      const stats = fs.statSync(filepath);
      const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`${sizeMB}MB`);

      images.push(`/brochure-pages/${filename}`);
    }

    // Save images.json
    const imagesJsonPath = path.join(__dirname, '../public/images.json');
    fs.writeFileSync(imagesJsonPath, JSON.stringify(images, null, 2));
    console.log(`\n✓ Saved images.json with ${images.length} pages`);

    console.log(`\nExtraction complete!`);
    console.log(`Output directory: ${outputDir}`);
    console.log(`Sample images.json: ${imagesJsonPath}`);
    console.log(`\nNote: Extracted first ${sampleCount} pages for testing.`);
    console.log(`To extract all ${pageCount} pages, run this again with full page range.`);

  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

extractPages();
