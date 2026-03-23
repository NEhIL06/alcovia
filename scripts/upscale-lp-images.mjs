import sharp from 'sharp';
import { readdir, copyFile } from 'fs/promises';
import { join } from 'path';

const SRC = '/Users/vibhor/Desktop/alcovia-website/lp-images';
const DEST = '/Users/vibhor/Desktop/alcovia-website/public/images/lp';

// Mapping: clean name -> source filename
const IMAGE_MAP = {
  'hero.jpg':                'WhatsApp Image 2026-03-23 at 4.48.23 PM.jpeg',
  'false-readiness.jpg':     'WhatsApp Image 2026-03-23 at 4.48.49 PM.jpeg',
  'outdated-guidance.jpg':   'WhatsApp Image 2026-03-23 at 4.48.23 PM (2).jpeg',
  'weak-environments.jpg':   'WhatsApp Image 2026-03-23 at 4.53.10 PM.jpeg',
  'ideas-to-execution.jpg':  'WhatsApp Image 2026-03-23 at 4.48.23 PM (3).jpeg',
  'conviction.jpg':          'WhatsApp Image 2026-03-23 at 4.48.23 PM (1).jpeg',
  'environment.jpg':         'WhatsApp Image 2026-03-23 at 4.48.49 PM (3).jpeg',
  'future.jpg':              'WhatsApp Image 2026-03-23 at 4.48.49 PM (1).jpeg',
  'mentorship.jpg':          'WhatsApp Image 2026-03-23 at 4.48.49 PM (2).jpeg',
  'cohort.jpg':              'WhatsApp Image 2026-03-23 at 4.48.23 PM (5).jpeg',
};

// Target widths: hero = 3840 (4K), section images = 2560 (QHD)
const TARGET_WIDTH = {
  'hero.jpg': 3840,
};
const DEFAULT_WIDTH = 2560;

// Images that need a dark overlay tint for contrast on the dark green site
// (brighter/lighter images that might wash out)
const NEEDS_DARKEN = [
  'hero.jpg',
  'false-readiness.jpg',
  'outdated-guidance.jpg',
  'weak-environments.jpg',
  'ideas-to-execution.jpg',
  'outdated-guidance.jpg',
  'environment.jpg',
  'future.jpg',
  'cohort.jpg',
];

async function processImage(destName, srcName) {
  const srcPath = join(SRC, srcName);
  const destPath = join(DEST, destName);
  const targetW = TARGET_WIDTH[destName] || DEFAULT_WIDTH;

  let pipeline = sharp(srcPath);
  const meta = await pipeline.metadata();

  console.log(`Processing ${destName}: ${meta.width}x${meta.height} -> target ${targetW}px wide`);

  // Upscale if smaller than target, or resize to target
  pipeline = pipeline.resize({
    width: targetW,
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: false, // allow upscaling
  });

  // Apply subtle dark tint for images that need contrast on dark backgrounds
  if (NEEDS_DARKEN.includes(destName)) {
    // Darken by compositing a semi-transparent dark overlay
    const { width: w, height: h } = await sharp(srcPath).resize({ width: targetW, withoutEnlargement: false }).metadata()
      .then(m => ({ width: m.width || targetW, height: m.height || Math.round(targetW * 0.75) }));

    const overlay = await sharp({
      create: {
        width: w,
        height: h,
        channels: 4,
        background: { r: 8, g: 38, b: 30, alpha: 0.15 } // dark green tint at 15%
      }
    }).png().toBuffer();

    pipeline = pipeline.composite([{ input: overlay, blend: 'over' }]);
  }

  // Output as high-quality JPEG
  await pipeline
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(destPath);

  // Verify output
  const outMeta = await sharp(destPath).metadata();
  console.log(`  -> Saved: ${outMeta.width}x${outMeta.height} (${(outMeta.size / 1024).toFixed(0)}KB)`);
}

async function main() {
  console.log('Starting LP image processing...\n');

  for (const [destName, srcName] of Object.entries(IMAGE_MAP)) {
    await processImage(destName, srcName);
  }

  console.log('\nAll images processed successfully!');
}

main().catch(console.error);
