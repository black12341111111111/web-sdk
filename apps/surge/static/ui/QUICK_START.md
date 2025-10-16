# Quick Start - UI Asset Integration

## 📋 Checklist

### Step 1: Extract Assets ✅
- [x] Directory structure created in `static/ui/`
- [ ] Place original images in `source/` folder:
  - `ui_buttons_original.png` - The button sprite sheet
  - `background_original.png` - The cyberpunk cityscape
- [ ] Run extraction: `python extract_assets.py`
- [ ] Verify extracted buttons look correct
- [ ] Optimize images if needed

### Step 2: Integrate into Components
- [ ] Update `+page.svelte` to use new background
- [ ] Create button components (examples below)
- [ ] Test all button states (hover, active, disabled)
- [ ] Verify on mobile devices

### Step 3: Final Polish
- [ ] Add animations and effects
- [ ] Test accessibility (keyboard, screen readers)
- [ ] Optimize performance
- [ ] Cross-browser testing

## 🚀 Quick Integration Examples

### Background (Main Game Layout)

```svelte
<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let backgroundLoaded = false;
  
  onMount(() => {
    // Preload background
    const img = new Image();
    img.src = '/ui/backgrounds/cityscape-main.png';
    img.onload = () => backgroundLoaded = true;
  });
</script>

<div class="game-container" class:loaded={backgroundLoaded}>
  <div class="reel-container">
    <!-- Your reel components here -->
  </div>
  
  <div class="controls">
    <!-- Button components here -->
  </div>
</div>

<style>
  .game-container {
    min-height: 100vh;
    background: linear-gradient(180deg, #000814 0%, #1a0033 100%);
    background-image: url('/ui/backgrounds/cityscape-main.png');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    opacity: 0;
    transition: opacity 0.5s;
  }
  
  .game-container.loaded {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .game-container {
      background-image: url('/ui/backgrounds/cityscape-mobile.png');
    }
  }
</style>
```

### Spin Button Component

```svelte
<!-- src/components/SpinButton.svelte -->
<script lang="ts">
  export let onClick: () => void;
  export let disabled = false;
  export let spinning = false;
  export let variant: 'primary' | 'secondary' | 'rectangular' = 'primary';
  
  const buttonImages = {
    primary: '/ui/buttons/spin-primary.png',
    secondary: '/ui/buttons/spin-secondary.png',
    rectangular: '/ui/buttons/spin-rectangular.png'
  };
  
  function handleClick() {
    if (!disabled && !spinning) {
      onClick();
    }
  }
</script>

<button
  class="spin-button"
  class:spin-button--primary={variant === 'primary'}
  class:spin-button--rectangular={variant === 'rectangular'}
  class:spinning
  class:disabled
  on:click={handleClick}
  disabled={disabled || spinning}
  aria-label="Spin reels"
  style="background-image: url('{buttonImages[variant]}')"
>
  {#if spinning}
    <span class="spinner"></span>
  {/if}
</button>

<style>
  .spin-button {
    width: 150px;
    height: 150px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.6));
  }
  
  .spin-button--rectangular {
    width: 200px;
    height: 80px;
  }
  
  .spin-button:hover:not(.disabled):not(.spinning) {
    transform: scale(1.05);
    filter: drop-shadow(0 0 25px rgba(0, 212, 255, 0.9)) brightness(1.2);
  }
  
  .spin-button:active:not(.disabled):not(.spinning) {
    transform: scale(0.95);
  }
  
  .spin-button.spinning {
    animation: pulse 1s infinite;
    cursor: not-allowed;
  }
  
  .spin-button.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.3)) grayscale(0.5);
  }
  
  @keyframes pulse {
    0%, 100% {
      filter: drop-shadow(0 0 15px rgba(0, 212, 255, 0.6));
    }
    50% {
      filter: drop-shadow(0 0 30px rgba(0, 212, 255, 1));
    }
  }
  
  .spinner {
    position: absolute;
    inset: 0;
    border: 3px solid rgba(0, 212, 255, 0.2);
    border-top-color: #00D4FF;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
</style>
```

### Bonus/Feature Buttons

```svelte
<!-- src/components/FeatureButton.svelte -->
<script lang="ts">
  export let type: 'bonus' | 'surge' = 'bonus';
  export let active = false;
  export let onClick: () => void;
  
  const buttonConfig = {
    bonus: {
      image: '/ui/buttons/bonus.png',
      width: '250px',
      height: '80px',
      glow: 'rgba(255, 0, 168, 0.8)'
    },
    surge: {
      image: '/ui/buttons/surge.png',
      width: '150px',
      height: '150px',
      glow: 'rgba(0, 255, 245, 0.8)'
    }
  };
  
  const config = buttonConfig[type];
</script>

<button
  class="feature-button"
  class:active
  on:click={onClick}
  style="
    background-image: url('{config.image}');
    width: {config.width};
    height: {config.height};
    --glow-color: {config.glow};
  "
>
  <slot />
</button>

<style>
  .feature-button {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    filter: drop-shadow(0 0 10px var(--glow-color));
  }
  
  .feature-button:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 20px var(--glow-color)) brightness(1.15);
  }
  
  .feature-button.active {
    animation: glitch 0.5s infinite;
  }
  
  @keyframes glitch {
    0%, 100% { 
      transform: translate(0);
      filter: drop-shadow(0 0 20px var(--glow-color));
    }
    25% { 
      transform: translate(-2px, 2px);
      filter: drop-shadow(0 0 25px var(--glow-color)) hue-rotate(10deg);
    }
    75% { 
      transform: translate(2px, -2px);
      filter: drop-shadow(0 0 25px var(--glow-color)) hue-rotate(-10deg);
    }
  }
</style>
```

### Control Buttons

```svelte
<!-- src/components/ControlButton.svelte -->
<script lang="ts">
  export let type: 'settings' | 'play' | 'close' | 'next' | 'selector' = 'settings';
  export let onClick: () => void;
  export let ariaLabel: string;
  
  const buttonImages = {
    settings: '/ui/buttons/settings.png',
    play: '/ui/buttons/play.png',
    close: '/ui/buttons/close.png',
    next: '/ui/buttons/next.png',
    selector: '/ui/buttons/selector.png'
  };
</script>

<button
  class="control-button"
  on:click={onClick}
  aria-label={ariaLabel}
  style="background-image: url('{buttonImages[type]}')"
>
  <span class="sr-only">{ariaLabel}</span>
</button>

<style>
  .control-button {
    width: 60px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    filter: drop-shadow(0 0 5px rgba(0, 212, 255, 0.4));
  }
  
  .control-button:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 10px rgba(0, 212, 255, 0.8));
  }
  
  .control-button:active {
    transform: scale(0.95);
  }
  
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
```

## 🎨 CSS Variables to Add

Add these to your global styles or `app.css`:

```css
:root {
  /* Brand colors from UI assets */
  --surge-neon-blue: #00D4FF;
  --surge-neon-cyan: #00FFF5;
  --surge-neon-pink: #FF00A8;
  --surge-magenta: #FF0099;
  
  /* Background */
  --surge-dark-navy: #000814;
  --surge-deep-purple: #1a0033;
  
  /* Effects */
  --surge-glow-blue: rgba(0, 212, 255, 0.6);
  --surge-glow-cyan: rgba(0, 255, 245, 0.6);
  --surge-glow-pink: rgba(255, 0, 168, 0.6);
  
  /* Shadows */
  --surge-shadow-sm: 0 0 10px rgba(0, 212, 255, 0.4);
  --surge-shadow-md: 0 0 20px rgba(0, 212, 255, 0.6);
  --surge-shadow-lg: 0 0 30px rgba(0, 212, 255, 0.8);
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile first approach */
@media (min-width: 640px) {
  /* sm: small devices */
}

@media (min-width: 768px) {
  /* md: tablets */
}

@media (min-width: 1024px) {
  /* lg: laptops */
}

@media (min-width: 1280px) {
  /* xl: desktops */
}
```

## ✨ Animation Effects

### Neon Pulse
```css
@keyframes neon-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 10px var(--surge-glow-blue));
  }
  50% {
    filter: drop-shadow(0 0 25px var(--surge-glow-blue));
  }
}
```

### Glitch Effect (for Bonus)
```css
@keyframes glitch {
  0%, 100% { 
    transform: translate(0);
    filter: hue-rotate(0deg);
  }
  25% { 
    transform: translate(-3px, 3px);
    filter: hue-rotate(15deg);
  }
  50% { 
    transform: translate(3px, -3px);
    filter: hue-rotate(-15deg);
  }
  75% { 
    transform: translate(-2px, -2px);
    filter: hue-rotate(10deg);
  }
}
```

### Scan Lines (Cyberpunk effect)
```css
.scan-lines::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
```

## 🎯 Testing Checklist

- [ ] All buttons load correctly
- [ ] Transparency preserved (no white/black backgrounds)
- [ ] Hover effects work smoothly
- [ ] Active/pressed states feel responsive
- [ ] Disabled states clearly visible
- [ ] Background loads without layout shift
- [ ] Works on Chrome, Firefox, Safari, Edge
- [ ] Responsive on mobile (375px - 1920px widths)
- [ ] Touch targets minimum 44x44px (mobile)
- [ ] Keyboard navigation works (Tab, Enter, Space)
- [ ] Screen reader announces buttons properly
- [ ] Performance: smooth 60fps animations

## 📦 File Sizes Target

After optimization:
- Small controls (settings, etc.): <25KB each
- Circular spin buttons: <80KB each
- Rectangular buttons: <100KB each
- Background (main): <500KB (WebP) or <2MB (PNG)
- Background (mobile): <300KB (WebP)

## 🚀 Next Steps

1. **Place source images** in `static/ui/source/` folder
2. **Run extraction script**: `python extract_assets.py`
3. **Review extracted assets** - adjust coordinates if needed
4. **Copy component examples** above into your Svelte app
5. **Test in browser** - verify all buttons work
6. **Optimize** - compress images further if needed
7. **Polish** - add custom animations and effects

---

**Ready to go!** 🎮 Your UI structure is set up and ready for the extracted assets.
