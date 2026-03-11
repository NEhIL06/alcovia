#!/usr/bin/env python3
"""
Extract PDF pages as high-quality JPEG images using PyMuPDF.
This is self-contained and doesn't require Poppler or system binaries.
"""
import os
import sys
import json
from pathlib import Path
import pymupdf as fitz

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
PDF_PATH = PROJECT_ROOT / "public" / "Alcovia_Brochure.pdf"
OUTPUT_DIR = PROJECT_ROOT / "public" / "brochure-pages"
IMAGES_JSON = PROJECT_ROOT / "public" / "images.json"

# Create output directory
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

def extract_pages(start_page=0, end_page=None):
    """Extract PDF pages as high-quality JPEG images."""
    if not PDF_PATH.exists():
        print(f"Error: PDF not found at {PDF_PATH}")
        sys.exit(1)

    print(f"PDF: {PDF_PATH}")
    print(f"Output: {OUTPUT_DIR}")
    print(f"Quality: High-DPI JPEG (95% quality)\n")

    try:
        # Open PDF
        doc = fitz.open(str(PDF_PATH))
        total_pages = doc.page_count

        print(f"Total pages in PDF: {total_pages}")

        # Determine page range
        if end_page is None:
            end_page = total_pages - 1

        pages_to_extract = min(end_page + 1 - start_page, total_pages - start_page)
        print(f"Extracting pages {start_page + 1} to {min(end_page + 1, total_pages)}...\n")

        images = []
        total_size = 0

        for page_num in range(start_page, min(end_page + 1, total_pages)):
            # Get page
            page = doc[page_num]

            # Render at high resolution (300 DPI equivalent)
            # Default is 72 DPI, so we use matrix scaling
            # A4 at 300 DPI = 2481 x 3507 pixels
            # At 72 DPI = 595 x 842 pixels
            # Ratio = 300/72 = 4.167
            zoom = 4.167
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat, alpha=False)

            # Save as JPEG
            filename = f"Alcovia_Brochure-{page_num + 1}.jpg"
            filepath = OUTPUT_DIR / filename

            # PyMuPDF save - quality is set in pixmap rendering, not save
            # Save as JPEG with best quality
            pix.save(str(filepath), 'jpeg')

            # Get file size
            file_size = filepath.stat().st_size / (1024 * 1024)  # MB
            total_size += file_size
            print(f"[OK] Page {page_num + 1}: {filename} ({file_size:.2f} MB)")

            images.append(f"/brochure-pages/{filename}")

        doc.close()

        # Save images.json
        with open(IMAGES_JSON, 'w') as f:
            json.dump(images, f, indent=2)

        print(f"\n{'='*50}")
        print(f"[OK] Extraction complete!")
        print(f"Pages extracted: {len(images)}")
        print(f"Total size: {total_size:.2f} MB")
        print(f"Avg per page: {total_size/len(images):.2f} MB")
        print(f"Output: {OUTPUT_DIR}")
        print(f"Images JSON: {IMAGES_JSON}")

        return len(images)

    except Exception as e:
        print(f"Error during conversion: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    # First, extract pages 1-50 as a sample to test quality
    extract_pages(start_page=0, end_page=49)
