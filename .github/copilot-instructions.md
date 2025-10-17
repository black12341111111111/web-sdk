# 🕹 Stake Engine Front-End Copilot Development Guide

This repository uses the **Stake (Carrot) Web SDK** for front-end game creation.
All Copilot-generated code **must comply** with the SDK's architecture and integration standards.

---

## ⚙️ Framework Overview

**Tech stack:**

* **SvelteKit** for component structure
* **Pixi.js** (via `pixi-svelte`) for rendering
* **xstate** for state machines
* **pnpm** for monorepo builds
* **Storybook** for component testing
* **RGS API** for game data synchronization

---

## 🧠 Core Architectural Rules

1. **BookEvents → EventEmitter → Visuals**

   * Game math sends `bookEvents` via RGS.
   * Each event is handled in `bookEventHandlerMap.ts`.
   * Handlers use `eventEmitter.broadcast()` or `broadcastAsync()` to trigger front-end visuals.
   * Svelte components subscribe to these events and perform animations or state transitions.

   **Example:**

   ```ts
   // bookEventHandlerMap.ts
   const bookEventHandlerMap = {
     updateGlobalMult: async (bookEvent) => {
       eventEmitter.broadcast({ type: 'globalMultiplierShow' });
       await eventEmitter.broadcastAsync({
         type: 'globalMultiplierUpdate',
         multiplier: bookEvent.globalMult,
       });
     },
   };
   ```

   ```svelte
   <!-- GlobalMultiplier.svelte -->
   <script>
     import { eventEmitter } from '$lib/context';
     import { onMount } from 'svelte';
     import { tween } from 'svelte/motion';

     let multiplier = 1;

     onMount(() => {
       eventEmitter.subscribeOnMount('globalMultiplierShow', () => show());
       eventEmitter.subscribeOnMount('globalMultiplierUpdate', (e) => animate(e.multiplier));
     });

     function show() { /* PIXI show animation */ }
     function animate(value) {
       const t = tween(multiplier, value, { duration: 500 });
       t.subscribe(v => multiplier = v);
     }
   </script>
   ```

---

## 🎨 Visuals and Animation Rules

* Use **Pixi-Svelte components** only:

  * `<PixiContainer>`, `<PixiSprite>`, `<PixiAnimatedSprite>`, `<PixiSpine>`, `<PixiText>`
* Every animation must be **asynchronous** — return a promise and complete before the next bookEvent.
* Use `eventEmitter.broadcastAsync()` to synchronize visuals and gameplay timing.
* Prefer **spritesheets or Spine** for animations.
* Keep all components atomic and reusable.

---

## 🧩 Component Structure

```
apps/<game-name>/
 ├─ src/
 │   ├─ components/
 │   │   ├─ Reels.svelte
 │   │   ├─ Symbols.svelte
 │   │   ├─ BigWin.svelte
 │   │   ├─ Multiplier.svelte
 │   │   └─ FreeSpinsOverlay.svelte
 │   ├─ bookEventHandlerMap.ts
 │   └─ emitterEventHandlerMap.ts
 ├─ stories/
 │   ├─ COMPONENTS/Reels/component.stories.svelte
 │   ├─ MODE_BASE/bookEvent/reveal.stories.svelte
 │   └─ MODE_BONUS/bookEvent/win.stories.svelte
```

Each component should include:

* a Svelte script section for logic
* a `<PixiContainer>` for layout
* subscriptions to emitter events
* exported props for Storybook testing

---

## 🧱 Development Workflow

1. `pnpm install`
2. Run the Storybook for your module:

   ```bash
   pnpm run storybook --filter=<game-name>
   ```
3. Preview emitter events and animations in isolation.
4. Build for upload:

   ```bash
   pnpm run build --filter=<game-name>
   ```
5. Upload the contents of `apps/<game-name>/.svelte-kit/output/client` to the Stake Engine file manager.

---

## 🚦 Copilot Behavior Expectations

When Copilot generates code:

* It must define new **bookEvent handlers** in `bookEventHandlerMap.ts`.
* It must generate **Svelte components** that listen to emitter events.
* It must follow **Pixi-Svelte syntax**, not raw DOM or React.
* It must link emitter events to **animations or transitions**.
* It must include **storybook stories** for isolated testing.

---

## 🔄 Example Commands

Generate visuals and event logic:

> Create new emitter event handlers and Svelte components for all visual animations in the Stake SDK format. Use `pixi-svelte` and connect everything via `bookEventHandlerMap.ts`.

Generate Storybook scenes:

> Create storybook files for each component under `/stories/MODE_BASE/bookEvent/` so I can preview animations independently.

---
