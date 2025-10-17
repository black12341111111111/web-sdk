# Stake Engine Front-End SDK – Visuals, Animations & FX Layer Guide

## PURPOSE
Define how to implement immersive front-end visuals and animations for StakeEngine SDK–based games using React, Framer Motion, and GSAP.

---

## GOAL
Create visually dynamic slot game animations that:
1. Feel smooth and rewarding.
2. React directly to Stake SDK events.
3. Use GPU-optimized, lightweight animation patterns.

---

## RECOMMENDED LIBRARIES
- **Framer Motion** → for UI transitions and component-based animations.
- **GSAP (GreenSock)** → for continuous motion (reel spin, particle trails, glow flicker).
- **React useRef hooks** → for direct DOM animation targets when needed.

---

## ANIMATION OVERVIEW

| Event | Animation Type | Effect Description |
|-------|----------------|-------------------|
| `onSpinStart()` | Reel motion start | GSAP tween reels downward, blur symbols, disable buttons |
| `onReelStop()` | Reel slow-down | Easing-out motion, flash winning symbols |
| `onWin()` | FX burst | Neon glow pulse, particle explosion, win text pop |
| `onUpdateBalance()` | Number tween | Smooth counting animation on balance display |
| `Idle` | Ambient | Subtle background motion, flickering neon effects |

---

## 1. **Reel Spin Animation (GSAP)**

Reels should visually spin using GSAP tweens tied to SDK state.

**Example pattern:**
```tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Reel({ symbols, isSpinning, index }) {
  const reelRef = useRef(null);

  useEffect(() => {
    if (isSpinning) {
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(reelRef.current, {
        y: "-=200",
        duration: 0.15,
        ease: "none",
      });
      reelRef.current.animation = tl;
    } else {
      if (reelRef.current.animation) {
        reelRef.current.animation.kill();
        gsap.to(reelRef.current, {
          y: 0,
          duration: 0.8,
          ease: "bounce.out",
        });
      }
    }
  }, [isSpinning]);

  return (
    <div
      ref={reelRef}
      className="flex flex-col items-center justify-center text-white text-3xl font-bold"
    >
      {symbols.map((s, i) => (
        <div key={i} className="h-16 w-16 flex items-center justify-center">
          {s}
        </div>
      ))}
    </div>
  );
}
```

---

## 2. **Win Glow & Particle Effects**

Trigger special FX on `onWin()` event.

**Example implementation:**

```tsx
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export function WinFX({ winResult }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (winResult) {
      setVisible(true);
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.7 },
      });
      setTimeout(() => setVisible(false), 3000);
    }
  }, [winResult]);

  return (
    visible && (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1.2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="text-6xl font-extrabold text-yellow-400 drop-shadow-[0_0_20px_#FFD700]"
        >
          BIG WIN!
        </motion.div>
      </motion.div>
    )
  );
}
```

---

## 3. **Neon Background & Ambient Animation**

Use Framer Motion or GSAP to give your background a sense of life.

**Example pattern:**

```tsx
import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <motion.div
      className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-800 to-black"
      animate={{
        backgroundPosition: ["0% 0%", "100% 100%"],
        filter: ["brightness(1)", "brightness(1.2) saturate(1.1)"],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
}
```

---

## 4. **Button and UI Animations**

**Spin Button (Framer Motion):**

```tsx
<motion.button
  whileHover={{ scale: 1.1, boxShadow: "0px 0px 12px rgba(255,255,255,0.6)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
  className="bg-gradient-to-r from-pink-600 to-purple-700 px-6 py-3 rounded-xl text-white font-bold"
>
  Spin
</motion.button>
```

---

## 5. **Glow Trails and Reactive Lighting**

Create glow trails behind moving elements with **CSS blur filters** or **canvas overlays**:

```css
.glow-trail {
  filter: blur(6px) brightness(1.3);
  mix-blend-mode: screen;
}
```

Tie their opacity to reel spin speed via React state or GSAP tweens.

---

## 6. **Copilot Prompt Examples**

When prompting Copilot Chat, use:

> "Using `stake_visuals_and_fx_guide.md`, generate all visual layers for my slot game, including reel animations, background motion, and win particle effects."

or

> "Implement Framer Motion and GSAP animations for reels, spin button, and win text following the patterns described in the visuals and FX guide."

---

## PERFORMANCE NOTES

* Always use `will-change: transform` on animated layers for GPU acceleration.
* Keep animation durations short (<1s) for responsive gameplay.
* Use lazy loading for FX libraries like `canvas-confetti`.

---

## VISUAL HIERARCHY SUMMARY

1. BackgroundEffects – always running
2. Reels (with GSAP spin animation)
3. HUD + Spin button (Framer Motion transitions)
4. WinFX overlay (Framer Motion + confetti)
5. Particle/glow overlays for atmosphere

---

End of file.
