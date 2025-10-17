# Stake Engine Front-End SDK – UI & Animation Build Guide

## GOAL
Build a complete front-end interface for my custom StakeEngine slot game using the Stake Front-End SDK.  
The UI should look premium, smooth, and visually immersive — with clean code that follows the Stake SDK's required hooks and game lifecycle.

---

## TECH STACK
- Framework: **React (with Vite or Next.js)**
- Styling: **TailwindCSS**
- Animation: **Framer Motion** (preferred) or **GSAP**
- State handling: Stake SDK lifecycle and React state hooks
- File structure: Modular components (each feature in its own folder)

---

## CORE UI COMPONENTS

### 1. `GameCanvas`
Handles Stake SDK rendering, asset loading, and main game loop.  
Should:
- Display the background, reels, overlays, and animated effects.
- Use responsive design that scales to window size.
- Hook into Stake SDK methods like:
  - `onSpinStart()`
  - `onSpinStop()`
  - `onWin()`
  - `onUpdateBalance()`

---

### 2. `Reels`
Animated slot reels controlled by Stake SDK game state.  
Should:
- Use Framer Motion for spin and stop animations.
- Support 3–5 reels (configurable).
- Trigger glow or particle effects on winning combinations.
- Allow dynamic texture loading via Stake SDK.

---

### 3. `HUD` (Heads-Up Display)
Top or bottom panel that displays:
- **Player balance**
- **Bet amount**
- **Spin button**
- **Auto-spin toggle**
- **Sound toggle**

Animations:
- Spin button glows or pulses when ready.
- Balance smoothly counts up/down when changed.

---

### 4. `PaytableModal`
Modal window that shows:
- All symbols with payout values.
- Game rules.
- Return-to-player (RTP) info if available.
- Styled with a neon cyberpunk theme (think purple, blue, pink glow).

Animations:
- Slide-in/out transition.
- Fade background overlay.

---

### 5. `BackgroundEffects`
- Animated looping background using gradients or moving light streaks.
- Optional subtle parallax effect for depth.
- Use Framer Motion or CSS keyframes.

---

## VISUAL STYLE GUIDE
- Theme: **Cyberpunk neon city** aesthetic.
- Color palette: Deep blues, vibrant purples, magenta, and silver highlights.
- Fonts: Futuristic sans-serif (like Orbitron or Rajdhani).
- Shadows and glows should feel immersive, not garish.
- All transitions smooth (easeInOut, 0.5–1s duration).

---

## INTERACTIVITY
- Use Stake SDK state to drive UI reactions.
- Example:
  - When `onSpinStart` → disable spin button, trigger reel animation.
  - When `onWin` → play win animation, show payout popup.
  - When `onUpdateBalance` → animate balance number change.

---

## ANIMATION LIBRARIES
- **Framer Motion** for UI elements.
- **GSAP** for complex reel motion or particle effects.
- Use performance-friendly patterns (e.g., requestAnimationFrame loops, memoized components).

---

## FILE STRUCTURE SUGGESTION
```
/src
  /components
    /GameCanvas
    /Reels
    /HUD
    /PaytableModal
    /BackgroundEffects
  /assets
    /symbols
    /sounds
  /styles
  App.tsx
  main.tsx
```

---

## EXAMPLE PROMPTS FOR COPILOT
When using Copilot Chat or inline suggestions, try:

> "Use the context from `stake_ui_instructions.md` to generate the complete GameCanvas component with responsive layout and animation logic for reel spin/stop using Stake SDK state."

or

> "Based on the Stake UI guide, build a PaytableModal with Framer Motion transitions and neon-glow Tailwind styling."

---

## EXTRA NOTES
- Keep components clean and reusable.
- Prefer declarative animations (Framer Motion) over manual DOM manipulation.
- Use the Stake SDK for all state changes — don't manually simulate spins or payouts.
- Ensure UI runs smoothly at 60fps on desktop and mobile.

---

End of file.
