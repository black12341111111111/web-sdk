# Stake Engine Front-End SDK – Lifecycle & React Hook Integration Guide

## PURPOSE
This document explains how to integrate the Stake Front-End SDK with a React-based game UI.  
It defines how to connect SDK state changes (like spin start, stop, win, etc.) to React components and animations.

---

## GOAL
Give GitHub Copilot and developers clear guidance to:
1. Use Stake SDK lifecycle hooks inside React components.
2. Update UI visuals, animations, and game state reactively.
3. Maintain separation between **game logic (SDK)** and **UI rendering (React)**.

---

## STAKE SDK LIFECYCLE OVERVIEW

| Event | Description | Typical UI Response |
|-------|--------------|--------------------|
| `onGameInit()` | Called once after SDK loads | Initialize UI, show splash/loading screen |
| `onSpinStart()` | Player initiates a spin | Disable spin button, start reel animations |
| `onReelStop(reelIndex)` | Each reel stops individually | Animate symbol stop, update partial results |
| `onSpinStop()` | All reels finished spinning | Re-enable buttons, show results or win animation |
| `onWin(result)` | Win detected | Play glow/particle effects, update balance, show popup |
| `onUpdateBalance(amount)` | Balance changes | Smoothly animate balance counter |
| `onError(error)` | SDK error or network issue | Show alert or fallback UI |

---

## HOOK STRUCTURE (REACT)

### 1. `useStakeGame()` – Custom Hook
Create a React hook that wraps all Stake SDK event listeners.

**Example Implementation:**
```tsx
import { useEffect, useState } from "react";
import StakeSDK from "@stake/sdk-frontend";

export function useStakeGame() {
  const [balance, setBalance] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelResults, setReelResults] = useState([]);
  const [winResult, setWinResult] = useState(null);

  useEffect(() => {
    StakeSDK.onGameInit(() => {
      console.log("Game initialized");
    });

    StakeSDK.onUpdateBalance((newBalance) => {
      setBalance(newBalance);
    });

    StakeSDK.onSpinStart(() => {
      setIsSpinning(true);
      setWinResult(null);
    });

    StakeSDK.onReelStop((reelIndex, symbols) => {
      setReelResults((prev) => {
        const updated = [...prev];
        updated[reelIndex] = symbols;
        return updated;
      });
    });

    StakeSDK.onSpinStop(() => {
      setIsSpinning(false);
    });

    StakeSDK.onWin((result) => {
      setWinResult(result);
    });

    StakeSDK.onError((err) => console.error("Stake SDK error:", err));

    return () => StakeSDK.removeAllListeners();
  }, []);

  return { balance, isSpinning, reelResults, winResult };
}
```

---

### 2. Using the Hook in Components

Example of how the hook ties into your front-end visuals:

```tsx
import { useStakeGame } from "@/hooks/useStakeGame";
import { motion } from "framer-motion";

export default function GameCanvas() {
  const { balance, isSpinning, reelResults, winResult } = useStakeGame();

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className="absolute top-4 right-4 text-white">
        Balance: {balance.toFixed(2)}
      </div>

      {/* Reels */}
      <div className="flex gap-2">
        {reelResults.map((reel, i) => (
          <motion.div
            key={i}
            animate={{ y: isSpinning ? [0, -1000, 0] : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="bg-gray-900 text-center p-2 rounded-lg text-white shadow-lg"
          >
            {reel?.join(" ") || "—"}
          </motion.div>
        ))}
      </div>

      {/* Spin Button */}
      <button
        disabled={isSpinning}
        onClick={() => StakeSDK.startSpin()}
        className={`mt-8 px-6 py-3 rounded-xl font-bold transition-all ${
          isSpinning
            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
            : "bg-purple-600 hover:bg-purple-700 text-white"
        }`}
      >
        {isSpinning ? "Spinning..." : "Spin"}
      </button>

      {/* Win Result */}
      {winResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-8 text-3xl text-yellow-400 font-extrabold"
        >
          You won {winResult.amount} credits!
        </motion.div>
      )}
    </div>
  );
}
```

---

## RECOMMENDED HOOKS & STRUCTURE

| Hook Name         | Purpose                          | Used By                      |
| ----------------- | -------------------------------- | ---------------------------- |
| `useStakeGame()`  | Core game state + SDK listeners  | GameCanvas, HUD              |
| `useBalance()`    | Balance updates only             | HUD                          |
| `useAnimations()` | Control glow/particle animations | GameCanvas, Reels            |
| `useSoundFX()`    | Play sound effects on events     | All components needing sound |

---

## COPILOT PROMPT EXAMPLES

You can tell GitHub Copilot:

> "Use the guide in `stake_sdk_hooks_guide.md` to connect my Stake SDK lifecycle events to the React UI. Implement custom hooks and wire up visuals in the GameCanvas and HUD components."

Or:

> "Generate React hooks and Framer Motion animations based on the Stake SDK event flow described in `stake_sdk_hooks_guide.md`."

---

## PERFORMANCE RECOMMENDATIONS

* Throttle updates from `onUpdateBalance()` if frequent.
* Memoize components that don't depend on rapidly changing state.
* Use `useCallback` for event handler functions.
* Unsubscribe from SDK listeners in cleanup to avoid memory leaks.

---

End of file.
