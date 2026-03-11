#!/usr/bin/env python3
"""
Extract PDF pages as high-quality JPEG images for the flipbook.
Requires: pdf2image, Pillow
"""
import os
import sys
import json
from pathlib import Path
from pdf2image import convert_from_path

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
PDF_PATH = PROJECT_ROOT / "public" / "Alcovia_Brochure.pdf"
OUTPUT_DIR = PROJECT_ROOT / "public" / "brochure-pages"
IMAGES_JSON = PROJECT_ROOT / "public" / "images.json"

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def extract_pages(start_page=1, end_page=None):
    """Extract PDF pages as JPEG images."""
    if not PDF_PATH.exists():
        print(f"Error: PDF not found at {PDF_PATH}")
        sys.exit(1)

    print(f"PDF: {PDF_PATH}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Resolution: 300 DPI | Quality: 95%\n")

    try:
        # Convert pages to images (300 DPI for high quality)
        print(f"Converting pages {start_page} to {end_page or 'all'}...")

        # Get all pages first
        first_pass = convert_from_path(
            str(PDF_PATH),
            dpi=300,
            first_page=start_page,
            last_page=end_page,
        )

        print(f"Extracted {len(first_pass)} pages\n")

        images = []
        for idx, image in enumerate(first_pass, start=start_page):
            filename = f"Alcovia_Brochure-{idx}.jpg"
            filepath = OUTPUT_DIR / filename

            # Save as high-quality JPEG
            image.save(
                filepath,
                format="JPEG",
                quality=95,
                optimize=True,
            )

            # Get file size
            file_size = filepath.stat().st_size / (1024 * 1024)  # MB
            print(f"✓ Page {idx}: {filename} ({file_size:.2f} MB)")

            images.append(f"/brochure-pages/{filename}")

        # Save images.json
        with open(IMAGES_JSON, 'w') as f:
            json.dump(images, f, indent=2)

        print(f"\n✓ Saved images.json with {len(images)} pages")
        print(f"Output directory: {OUTPUT_DIR}")

        return len(images)

    except Exception as e:
        print(f"Error during conversion: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Extract first 50 pages as initial sample
    # This lets us test quality/file size before processing full 1560 pages
    extract_pages(start_page=1, end_page=50)
