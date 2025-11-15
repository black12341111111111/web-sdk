# Crypto Stacks Metavault

A 5x4 slot game with 1024 ways to win, featuring chip collection and symbol upgrades during free spins.

## Quick Start

### Development
```bash
# From web-sdk root
pnpm install
pnpm run dev --filter=crypto-stacks-metavault
```
Access at: http://localhost:3002

### Storybook
```bash
pnpm run storybook --filter=crypto-stacks-metavault
```
Access at: http://localhost:6002

### Build
```bash
pnpm run build --filter=crypto-stacks-metavault
```

## Game Features

- **Grid:** 5 reels × 4 rows = 1024 ways to win
- **RTP:** 96%
- **Max Win:** 5000x
- **Symbols:** 14 symbols (IDs 0-13)
- **Game Modes:** base, buy_8 (100x), buy_15 (200x)

### Free Spins Feature
- Triggered by 3+ SCATTER symbols
- Chip collection system upgrades medium symbols
- Wild symbols with x2/x3 multipliers on reels 2-4

### Chip Collection & Upgrades
Collect CHIP symbols during free spins to upgrade medium symbols:
- 4 chips: M1 → M2
- 7 chips: M2 → M3
- 12 chips: M3 → M4
- 15 chips: M4 → DIAMOND

## Documentation

- [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md) - Complete integration guide
- [SYMBOL_REFERENCE.md](./SYMBOL_REFERENCE.md) - Symbol IDs and paytable

## Project Structure

```
src/
├── components/          # Svelte components
│   ├── Game.svelte     # Main game component
│   ├── ChipCollector.svelte
│   ├── SymbolUpgrade.svelte
│   └── WildMultiplier.svelte
├── game/               # Game logic
│   ├── config.ts       # Game configuration
│   ├── bookEventHandlerMap.ts
│   └── stateGame.svelte.ts
└── stories/            # Storybook tests
    ├── data/           # Test data
    └── *.stories.svelte
```

## Synchronization with Math SDK

This web-sdk implementation is synchronized with the math-sdk at:
`/workspace/math-sdk/games/crypto_stacks_metavault/`

Key synchronization points:
- Symbol IDs (0-13)
- Game modes (base, buy_8, buy_15)
- BookEvent types (CHIP_COLLECTION, SYMBOL_UPGRADE, FREESPIN_STATE)
- Game state fields (chipsCollected, currentUpgradeLevel, fsRemaining)

## Testing

### Storybook Tests
- Component tests: `COMPONENTS/*`
- Base game: `MODE_BASE/*`
- Free spins: `MODE_BONUS/*`

### Custom BookEvents
- `CHIP_COLLECTION` - Test chip collection
- `SYMBOL_UPGRADE` - Test symbol upgrades
- `FREESPIN_STATE` - Test free spin state

## Deployment

1. Build: `pnpm run build --filter=crypto-stacks-metavault`
2. Collect files from `.svelte-kit/output/`
3. Upload to Stake Engine Files page
4. Publish frontend
5. Test in Developer mode

## License

MIT