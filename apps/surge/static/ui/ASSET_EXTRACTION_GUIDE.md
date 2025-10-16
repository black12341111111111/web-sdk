# UI Asset Extraction Guide

## 📁 Directory Structure Created

```
surge/static/ui/
├── source/          # Place original images here
├── buttons/         # Extracted button sprites go here
├── backgrounds/     # Background images go here
└── ASSET_EXTRACTION_GUIDE.md (this file)
```

## 🎨 Assets to Extract

### SOURCE IMAGE 1: Button Sprites
**Save as**: `source/ui_buttons_original.png`

This sprite sheet contains the following buttons to extract:

#### Button Extraction Map (Top to Bottom, Left to Right)

1. **SPIN Button (Primary - Circular)**
   - Location: Top left
   - Size: ~200x200px circular
   - Color: Neon blue glow
   - Save as: `buttons/spin-primary.png`
   - Usage: Main spin button

2. **SPIN Button (Secondary - Circular)**
   - Location: Top center
   - Size: ~200x200px circular
   - Color: Neon blue glow
   - Save as: `buttons/spin-secondary.png`
   - Usage: Alternative spin button state

3. **SPIN Button (Variant - Circular)**
   - Location: Top right
   - Size: ~200x200px circular
   - Color: Neon blue glow
   - Save as: `buttons/spin-variant.png`
   - Usage: Another spin state

4. **BONUS Button (Rectangular)**
   - Location: Middle left
   - Size: ~300x100px rectangular
   - Color: Pink/magenta with glitch effect
   - Save as: `buttons/bonus.png`
   - Usage: Bonus feature trigger button

5. **SURGE Button (Circular)**
   - Location: Middle center
   - Size: ~200x200px circular
   - Color: Cyan/aqua glow
   - Save as: `buttons/surge.png`
   - Usage: Surge feature activation

6. **SPIN Button (Rectangular)**
   - Location: Middle right
   - Size: ~250x100px rectangular
   - Color: Cyan outline
   - Save as: `buttons/spin-rectangular.png`
   - Usage: Rectangular spin button variant

7. **Circle Selector**
   - Location: Bottom left
   - Size: ~80x80px
   - Color: Cyan outline
   - Save as: `buttons/selector.png`
   - Usage: Selection indicator

8. **Settings Gear**
   - Location: Bottom second from left
   - Size: ~80x80px
   - Color: Cyan outline
   - Save as: `buttons/settings.png`
   - Usage: Game settings menu

9. **Forward Arrow**
   - Location: Bottom center
   - Size: ~80x80px
   - Color: Cyan outline
   - Save as: `buttons/next.png`
   - Usage: Navigation forward

10. **Play Triangle**
    - Location: Bottom right center
    - Size: ~80x80px
    - Color: Cyan outline
    - Save as: `buttons/play.png`
    - Usage: Auto-play or start

11. **Close X**
    - Location: Bottom right
    - Size: ~80x80px
    - Color: Cyan outline
    - Save as: `buttons/close.png`
    - Usage: Close modals/menus

### SOURCE IMAGE 2: Background
**Save as**: `source/background_original.png`

#### Background Processing Steps

1. **Main Background**
   - Save full image as: `backgrounds/cityscape-main.png`
   - Optimize for web delivery
   - Consider creating WebP version: `backgrounds/cityscape-main.webp`

2. **Mobile-Optimized Version**
   - Resize to max width 1080px: `backgrounds/cityscape-mobile.png`
   - Further compress for faster mobile loading

3. **Blurred Overlay (Optional)**
   - Create blurred version for modal overlays
   - Apply 20px Gaussian blur
   - Save as: `backgrounds/cityscape-blur.png`

## 🛠️ Extraction Methods

### Method 1: Manual Slicing (Photoshop/GIMP/Figma)

1. Open `source/ui_buttons_original.png` in your editor
2. Use Rectangle Select tool for each button
3. Create sufficient padding around glow effects
4. Export each selection with transparency (PNG-24)
5. Maintain aspect ratios

### Method 2: Python Script (Automated)

```python
# Save this as extract_buttons.py in the ui/ directory
from PIL import Image
import os

# Define button regions (x, y, width, height)
# These are APPROXIMATE - adjust based on actual sprite sheet dimensions
button_coords = {
    'spin-primary.png': (0, 0, 200, 200),
    'spin-secondary.png': (220, 0, 200, 200),
    'spin-variant.png': (440, 0, 200, 200),
    'bonus.png': (0, 220, 300, 100),
    'surge.png': (320, 220, 200, 200),
    'spin-rectangular.png': (540, 220, 250, 100),
    'selector.png': (0, 440, 80, 80),
    'settings.png': (100, 440, 80, 80),
    'next.png': (200, 440, 80, 80),
    'play.png': (300, 440, 80, 80),
    'close.png': (400, 440, 80, 80),
}

def extract_buttons(sprite_path, output_dir):
    img = Image.open(sprite_path)
    
    for filename, (x, y, w, h) in button_coords.items():
        cropped = img.crop((x, y, x + w, y + h))
        output_path = os.path.join(output_dir, filename)
        cropped.save(output_path, 'PNG')
        print(f"Extracted: {filename}")

if __name__ == "__main__":
    extract_buttons('source/ui_buttons_original.png', 'buttons/')
    print("✅ Button extraction complete!")
```

### Method 3: ImageMagick CLI

```bash
# Install ImageMagick first: https://imagemagick.org/
# Adjust coordinates based on actual image dimensions

magick source/ui_buttons_original.png -crop 200x200+0+0 buttons/spin-primary.png
magick source/ui_buttons_original.png -crop 200x200+220+0 buttons/spin-secondary.png
magick source/ui_buttons_original.png -crop 200x200+440+0 buttons/spin-variant.png
# ... continue for other buttons
```

## 🎯 Quality Checklist

After extraction, verify each button:

- [ ] Transparency preserved (no white/black background)
- [ ] Glow effects intact (not clipped)
- [ ] Sufficient padding around edges
- [ ] File size reasonable (<100KB per button)
- [ ] Clear, sharp edges
- [ ] Consistent dimensions within button types

## 📐 Recommended Export Sizes

### Circular Buttons (Spin, Surge)
- Base size: 200x200px
- 2x size: 400x400px (for Retina displays)
- Format: PNG-24 with alpha channel

### Rectangular Buttons (Bonus, Spin-rect)
- Base size: Match original proportions
- 2x size: Double dimensions
- Format: PNG-24 with alpha channel

### Small Controls (Settings, Play, etc.)
- Base size: 80x80px
- 2x size: 160x160px
- Format: PNG-24 with alpha channel

### Background
- Desktop: 1920x1080px (or original size)
- Mobile: 1080x1920px (portrait)
- Format: WebP (primary), PNG (fallback)
- Quality: 85% compression

## 🚀 Optimization After Extraction

### PNG Optimization
```bash
# Using pngquant (install from https://pngquant.org/)
pngquant --quality=80-95 buttons/*.png --ext .png --force
```

### WebP Conversion
```bash
# Using cwebp (install from https://developers.google.com/speed/webp/download)
cwebp -q 85 backgrounds/cityscape-main.png -o backgrounds/cityscape-main.webp
```

### Batch Optimization Script (PowerShell)
```powershell
# Save as optimize_assets.ps1
Get-ChildItem -Path "buttons\*.png" | ForEach-Object {
    $input = $_.FullName
    Write-Host "Optimizing: $($_.Name)"
    # Add your optimization command here
}
```

## 📦 Expected Final Structure

```
ui/
├── buttons/
│   ├── spin-primary.png        (~50-80KB)
│   ├── spin-secondary.png      (~50-80KB)
│   ├── spin-variant.png        (~50-80KB)
│   ├── spin-rectangular.png    (~60-90KB)
│   ├── bonus.png               (~70-100KB)
│   ├── surge.png               (~50-80KB)
│   ├── selector.png            (~15-25KB)
│   ├── settings.png            (~15-25KB)
│   ├── next.png                (~15-25KB)
│   ├── play.png                (~15-25KB)
│   └── close.png               (~15-25KB)
├── backgrounds/
│   ├── cityscape-main.png      (~800KB-2MB)
│   ├── cityscape-main.webp     (~300-500KB)
│   ├── cityscape-mobile.png    (~400KB-1MB)
│   └── cityscape-blur.png      (optional)
└── source/
    ├── ui_buttons_original.png
    └── background_original.png
```

## 🎨 Color Reference (for CSS)

Extract these color values for consistent styling:

```css
/* Extracted from UI assets */
:root {
  /* Primary colors */
  --surge-neon-blue: #00D4FF;
  --surge-neon-cyan: #00FFF5;
  --surge-neon-pink: #FF00A8;
  --surge-magenta: #FF0099;
  
  /* Background colors */
  --surge-dark-navy: #000814;
  --surge-purple: #7B2CBF;
  --surge-deep-purple: #3C096C;
  
  /* Glow effects */
  --surge-blue-glow: rgba(0, 212, 255, 0.6);
  --surge-cyan-glow: rgba(0, 255, 245, 0.6);
  --surge-pink-glow: rgba(255, 0, 168, 0.6);
  
  /* Shadows */
  --surge-shadow-blue: 0 0 20px rgba(0, 212, 255, 0.8);
  --surge-shadow-pink: 0 0 20px rgba(255, 0, 168, 0.8);
}
```

## ✅ Next Steps After Extraction

1. Place original images in `source/` folder
2. Extract all button sprites to `buttons/` folder
3. Process background and save to `backgrounds/` folder
4. Optimize all assets (PNG compression, WebP conversion)
5. Test loading in browser (check for transparency issues)
6. Integrate into Svelte components (see `UI_ASSETS_README.md`)
7. Test responsive behavior on multiple screen sizes

---

**Tips for Best Results:**
- Always work from high-resolution originals
- Preserve transparency channels carefully
- Include glow effects in the crop region
- Test buttons on both light and dark backgrounds
- Consider creating @2x and @3x versions for high-DPI displays

**Need Help?** 
- Check the main `UI_ASSETS_README.md` for integration examples
- Test extracted assets in browser before full integration
- Keep source files for future edits
