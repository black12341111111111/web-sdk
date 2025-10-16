# Syndicate Surge - UI Assets

This directory contains all UI assets for the Syndicate Surge slot game, including buttons, backgrounds, and interface elements.

## 📁 Directory Structure

```
ui/
├── README.md                      # This file
├── QUICK_START.md                 # Quick integration guide
├── ASSET_EXTRACTION_GUIDE.md      # Detailed extraction instructions
├── extract_assets.py              # Automated extraction script
│
├── source/                        # Place original images here
│   ├── ui_buttons_original.png    # Button sprite sheet (your asset)
│   └── background_original.png    # Cyberpunk cityscape (your asset)
│
├── buttons/                       # Extracted button sprites (output)
│   ├── spin-primary.png
│   ├── spin-secondary.png
│   ├── spin-variant.png
│   ├── spin-rectangular.png
│   ├── bonus.png
│   ├── surge.png
│   ├── settings.png
│   ├── play.png
│   ├── close.png
│   ├── next.png
│   └── selector.png
│
└── backgrounds/                   # Processed backgrounds (output)
    ├── cityscape-main.png
    ├── cityscape-main.webp
    └── cityscape-mobile.png
```

## 🚀 Quick Start

### 1. Add Your Source Images

Save the two images you provided:
- Button sprite sheet → `source/ui_buttons_original.png`
- Cyberpunk background → `source/background_original.png`

### 2. Extract Assets

Run the extraction script:

```powershell
cd c:\Users\bryan\new111\web-sdk\apps\surge\static\ui
python extract_assets.py
```

This will automatically:
- Extract all 11 button sprites to `buttons/` folder
- Process background and create optimized versions
- Show you a summary of what was extracted

### 3. Review and Adjust

The script uses estimated coordinates. Check the extracted buttons:
- Are they complete (not cut off)?
- Do glow effects look good?
- Is transparency preserved?

If buttons look wrong, edit the `BUTTON_REGIONS` dictionary in `extract_assets.py` and re-run.

### 4. Integrate into Components

See `QUICK_START.md` for:
- Complete Svelte component examples
- CSS styling guide
- Animation effects
- Responsive design patterns

## 🎨 Asset Overview

### Buttons Extracted (11 total)

| Button | Size | Purpose | Color |
|--------|------|---------|-------|
| spin-primary.png | 200x200 | Main spin button | Neon blue |
| spin-secondary.png | 200x200 | Alt spin state | Neon blue |
| spin-variant.png | 200x200 | Spin variant | Neon blue |
| spin-rectangular.png | 250x100 | Rectangular spin | Cyan |
| bonus.png | 300x120 | Bonus feature | Pink/Magenta |
| surge.png | 200x200 | Surge feature | Cyan |
| settings.png | 80x80 | Settings menu | Cyan |
| play.png | 80x80 | Auto-play | Cyan |
| close.png | 80x80 | Close modal | Cyan |
| next.png | 80x80 | Navigation | Cyan |
| selector.png | 80x80 | Selection | Cyan |

### Backgrounds

| File | Size | Use Case |
|------|------|----------|
| cityscape-main.png | Original | Desktop/large screens |
| cityscape-main.webp | Optimized | Desktop (faster loading) |
| cityscape-mobile.png | ≤1080px | Mobile devices |

## 🎯 Design System

### Color Palette

```css
/* Primary Colors */

--surge-neon-blue: #00D4FF;

--surge-neon-cyan: #00FFF5;


/* Background Colors */

--surge-dark-navy: #000814;

--surge-deep-purple: #1a0033;

/* Glow Effects */
--surge-glow-blue: rgba(0, 212, 255, 0.6);
--surge-glow-cyan: rgba(0, 255, 245, 0.6);
--surge-glow-pink: rgba(255, 0, 168, 0.6);

```

### Typography

The cyberpunk aesthetic pairs well with:
- **Headings**: Orbitron, Rajdhani, or Audiowide
- **Body**: Roboto, Inter, or Exo 2
- **Monospace**: Fira Code or Share Tech Mono

### Effects



- **Neon Glow**: CSS `drop-shadow()` filter

- **Pulse**: Periodic glow intensity changes

## 📦 File Size Guidelines

### Before Optimization
- Buttons: 50-150KB each (PNG with transparency)
- Background: 1-3MB (high quality PNG)

### After Optimization
- Small controls: <25KB
- Circular buttons: <80KB
- Rectangular buttons: <100KB
- Background (WebP): <500KB
- Background mobile: <300KB

### Optimization Tips

```powershell
# Install tools
# pngquant: https://pngquant.org/
# cwebp: https://developers.google.com/speed/webp/download

# Optimize PNGs
pngquant --quality=80-95 buttons/*.png --ext .png --force

# Convert to WebP
cwebp -q 85 backgrounds/cityscape-main.png -o backgrounds/cityscape-main.webp
```

## 🔧 Usage in Components

### Import Button

```typescript
import SpinButton from '$lib/components/SpinButton.svelte';
import FeatureButton from '$lib/components/FeatureButton.svelte';
import ControlButton from '$lib/components/ControlButton.svelte';
```

### Use in Template

```svelte
<SpinButton 
  variant="primary" 
  onClick={handleSpin}
  disabled={isSpinning}
  spinning={isSpinning}
/>

<FeatureButton 
  type="bonus"
  active={bonusTriggered}
  onClick={handleBonus}
/>

<ControlButton 
  type="settings"
  ariaLabel="Open settings"
  onClick={openSettings}
/>
```

## ♿ Accessibility

All button components should include:

```svelte
<button
  aria-label="Descriptive label"
  aria-pressed={active ? "true" : "false"}
  aria-disabled={disabled ? "true" : "false"}
  role="button"
  tabindex="0"
>
  <span class="sr-only">Screen reader text</span>
</button>
```

### Keyboard Support

- **Tab**: Navigate between buttons
- **Enter/Space**: Activate button
- **Esc**: Close modals (with close button)

### Touch Targets

Minimum 44x44px for mobile:

```css
.control-button {
  min-width: 44px;
  min-height: 44px;
}
```

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile: 375px - 639px */
.spin-button { width: 120px; height: 120px; }

/* Tablet: 640px - 1023px */
@media (min-width: 640px) {
  .spin-button { width: 150px; height: 150px; }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .spin-button { width: 180px; height: 180px; }
}
```

### Background Strategy

```svelte
<style>
  .game-container {
    background-image: url('/ui/backgrounds/cityscape-mobile.png');
  }
  
  @media (min-width: 768px) {
    .game-container {
      background-image: url('/ui/backgrounds/cityscape-main.webp');
    }
  }
  
  /* Fallback for browsers without WebP support */
  @supports not (background-image: url('test.webp')) {
    .game-container {
      background-image: url('/ui/backgrounds/cityscape-main.png');
    }
  }
</style>
```

## 🎬 Animation Examples

### Button Hover

```css
.spin-button:hover {
  transform: scale(1.05);
  filter: drop-shadow(0 0 25px var(--surge-glow-blue)) brightness(1.2);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Bonus Trigger

```css
@keyframes bonus-trigger {
  0% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px var(--surge-glow-pink));
  }
  50% {
    transform: scale(1.2);
    filter: drop-shadow(0 0 40px var(--surge-glow-pink)) saturate(1.5);
  }
  100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px var(--surge-glow-pink));
  }
}
```

### Spin Animation

```css
@keyframes spinning {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spin-button.spinning {
  animation: spinning 1s linear infinite;
}
```

## 🐛 Troubleshooting

### Buttons have white backgrounds
- Ensure source images have alpha channel (RGBA mode)
- Check PNG-24 format with transparency
- Re-export from source with transparency enabled

### Glow effects cut off
- Increase padding in `extract_assets.py`
- Manually adjust crop regions
- Ensure sufficient space around buttons in sprite sheet

### File sizes too large
- Use WebP format for backgrounds
- Run pngquant on buttons
- Reduce dimensions for mobile versions
- Consider using SVG for simple icons

### Buttons look blurry
- Export at 2x or 3x resolution for high-DPI displays
- Use proper image scaling in CSS (`image-rendering: crisp-edges`)
- Ensure source images are high resolution

## 📚 Documentation

- **QUICK_START.md** - Fast integration guide with code examples
- **ASSET_EXTRACTION_GUIDE.md** - Detailed extraction instructions
- **UI_ASSETS_README.md** (in parent) - Complete integration strategy
- **extract_assets.py** - Automated extraction script with comments

## ✅ Status

- [x] Directory structure created
- [x] Extraction script ready
- [x] Documentation complete
- [ ] Source images added (waiting for user)
- [ ] Assets extracted
- [ ] Components implemented
- [ ] Testing complete

## 🎮 Game Context

These UI assets are for **Syndicate Surge**, a cyberpunk-themed 5x3 slot game:

- **Math SDK**: RTP tuned to 98% (target 96.5%)
- **Frontend**: Svelte 5.20.5 + TypeScript
- **Theme**: Dystopian cyberpunk with neon aesthetics
- **Features**: Base game + free spins with scatter triggers
- **Platform**: Stake Engine submission

---

**Need help?** Check the other README files or run `python extract_assets.py` to get started! 🚀
