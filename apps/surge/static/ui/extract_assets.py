"""
Syndicate Surge - UI Asset Extraction Script
Automatically extracts button sprites and processes background images
"""

from PIL import Image
import os
import sys

# Button coordinates (x, y, width, height)
# NOTE: These are estimates - adjust based on actual sprite sheet dimensions
from typing import Dict

BUTTON_REGIONS: Dict[str, Dict[str, object]] = {
    'spin-primary.png': {
        'coords': (50, 50, 200, 200),
        'description': 'Main circular SPIN button with neon blue glow'
    },
    'spin-secondary.png': {
        'coords': (300, 50, 200, 200),
        'description': 'Secondary circular SPIN button'
    },
    'spin-variant.png': {
        'coords': (550, 50, 200, 200),
        'description': 'Alternative circular SPIN button'
    },
    'bonus.png': {
        'coords': (50, 300, 350, 120),
        'description': 'Pink BONUS button with glitch effect'
    },
    'surge.png': {
        'coords': (450, 300, 200, 200),
        'description': 'SURGE feature button (cyan)'
    },
    'spin-rectangular.png': {
        'coords': (700, 300, 280, 100),
        'description': 'Rectangular SPIN button variant'
    },
    'selector.png': {
        'coords': (50, 550, 100, 100),
        'description': 'Circle selector control'
    },
    'settings.png': {
        'coords': (200, 550, 100, 100),
        'description': 'Settings gear icon'
    },
    'next.png': {
        'coords': (350, 550, 100, 100),
        'description': 'Forward arrow navigation'
    },
    'play.png': {
        'coords': (500, 550, 100, 100),
        'description': 'Play/auto-spin control'
    },
    'close.png': {
        'coords': (650, 550, 100, 100),
        'description': 'Close X button'
    },
}

def extract_button(image, name, coords, output_dir, padding=10):
    """
    Extract a button sprite with optional padding
    
    Args:
        image: PIL Image object
        name: Output filename
        coords: (x, y, width, height) tuple
        output_dir: Output directory path
        padding: Additional padding around the button (default 10px)
    """
    x, y, w, h = coords
    
    # Add padding
    x1 = max(0, x - padding)
    y1 = max(0, y - padding)
    x2 = min(image.width, x + w + padding)
    y2 = min(image.height, y + h + padding)
    
    # Crop the region
    cropped = image.crop((x1, y1, x2, y2))
    
    # Save with transparency
    output_path = os.path.join(output_dir, name)
    cropped.save(output_path, 'PNG', optimize=True)
    
    return output_path, cropped.size

def process_background(input_path, output_dir):
    """
    Process background image and create multiple versions
    """
    print("\n📸 Processing background image...")
    
    img = Image.open(input_path)
    
    # Main background
    main_path = os.path.join(output_dir, 'cityscape-main.png')
    img.save(main_path, 'PNG', optimize=True)
    print(f"  ✅ Saved main background: {img.size[0]}x{img.size[1]}px")
    
    # Mobile version (max width 1080px)
    if img.width > 1080:
        aspect_ratio = img.height / img.width
        mobile_size = (1080, int(1080 * aspect_ratio))
        mobile = img.resize(mobile_size, Image.Resampling.LANCZOS)
        mobile_path = os.path.join(output_dir, 'cityscape-mobile.png')
        mobile.save(mobile_path, 'PNG', optimize=True)
        print(f"  ✅ Saved mobile background: {mobile_size[0]}x{mobile_size[1]}px")
    
    return main_path

def analyze_sprite_sheet(image_path):
    """
    Analyze sprite sheet and provide dimension info
    """
    img = Image.open(image_path)
    print(f"\n🔍 Sprite Sheet Analysis:")
    print(f"  Dimensions: {img.width}x{img.height}px")
    print(f"  Mode: {img.mode}")
    print(f"  Format: {img.format}")
    
    if img.mode != 'RGBA':
        print("  ⚠️  Warning: Image doesn't have alpha channel (transparency)")
    
    return img

def main():
    """
    Main extraction process
    """
    print("=" * 70)
    print("🎮 SYNDICATE SURGE - UI Asset Extraction Tool")
    print("=" * 70)
    
    # Define paths
    base_dir = os.path.dirname(os.path.abspath(__file__))
    source_dir = os.path.join(base_dir, 'source')
    buttons_dir = os.path.join(base_dir, 'buttons')
    backgrounds_dir = os.path.join(base_dir, 'backgrounds')
    
    # Check for source images
    sprite_path = os.path.join(source_dir, 'ui_buttons_original.png')
    bg_path = os.path.join(source_dir, 'background_original.png')
    
    print(f"\n📂 Looking for source files...")
    print(f"  Buttons: {sprite_path}")
    print(f"  Background: {bg_path}")
    
    extracted_count = 0
    
    # Extract buttons if sprite sheet exists
    if os.path.exists(sprite_path):
        print(f"\n✅ Found button sprite sheet!")
        img = analyze_sprite_sheet(sprite_path)
        
        print(f"\n🔪 Extracting {len(BUTTON_REGIONS)} button sprites...")
        print("  (Using estimated coordinates - may need manual adjustment)\n")
        
        for name, info in BUTTON_REGIONS.items():
            try:
                output_path, size = extract_button(
                    img, name, info['coords'], buttons_dir, padding=15
                )
                file_size = os.path.getsize(output_path) / 1024  # KB
                print(f"  ✅ {name:25} {size[0]:4}x{size[1]:4}px  {file_size:6.1f}KB")
                print(f"     {info['description']}")
                extracted_count += 1
            except Exception as e:
                print(f"  ❌ {name:25} Error: {str(e)}")
    else:
        print(f"\n⚠️  Button sprite sheet not found!")
        print(f"  Please save your button sprites image as:")
        print(f"  {sprite_path}")
    
    # Process background if exists
    if os.path.exists(bg_path):
        print(f"\n✅ Found background image!")
        try:
            process_background(bg_path, backgrounds_dir)
        except Exception as e:
            print(f"  ❌ Error processing background: {str(e)}")
    else:
        print(f"\n⚠️  Background image not found!")
        print(f"  Please save your background image as:")
        print(f"  {bg_path}")
    
    # Summary
    print("\n" + "=" * 70)
    print(f"📊 EXTRACTION SUMMARY")
    print("=" * 70)
    print(f"  Buttons extracted: {extracted_count}/{len(BUTTON_REGIONS)}")
    
    if extracted_count > 0:
        print(f"\n✨ Extracted buttons saved to: {buttons_dir}")
        print(f"\n⚠️  IMPORTANT: The coordinates used are estimates!")
        print(f"  Please check each button to ensure:")
        print(f"    1. Full button is captured (not cut off)")
        print(f"    2. Glow effects are included")
        print(f"    3. Transparency is preserved")
        print(f"    4. No unwanted elements included")
        print(f"\n  If buttons look wrong, adjust coordinates in BUTTON_REGIONS")
        print(f"  dictionary at the top of this script and re-run.")
    
    if not os.path.exists(sprite_path) and not os.path.exists(bg_path):
        print(f"\n❌ NO SOURCE FILES FOUND")
        print(f"\n  To use this script:")
        print(f"  1. Save your button sprites as: {sprite_path}")
        print(f"  2. Save your background as: {bg_path}")
        print(f"  3. Run this script again: python extract_assets.py")
    
    print("\n" + "=" * 70)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\n❌ Fatal error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
