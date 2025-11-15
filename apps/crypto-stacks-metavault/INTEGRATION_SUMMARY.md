# Crypto Stacks Metavault - Stake Engine Web SDK Integration

## Overview
This is a complete integration of the Crypto Stacks Metavault slot game with the Stake Engine Web SDK, following the official patterns and structure.

## Game Specifications

### Grid & Mechanics
- **Grid Size:** 5x4 (5 reels, 4 rows)
- **Win Type:** 1024 Ways to Win
- **RTP:** 96%
- **Max Win:** 5000x

### Symbols (IDs 0-13)
- **Low Symbols (0-5):** 9, 10, J, Q, K, A
- **Medium Symbols (6-9):** M1, M2, M3, M4
- **Premium Symbol (10):** DIAMOND
- **Special Symbols:**
  - SCATTER (11): Triggers free spins
  - WILD (12): Appears in free spins on reels 2-4, has x2/x3 multipliers
  - CHIP (13): Collection feature in free spins

### Game Modes
1. **base** - Base game (cost: 1.0x)
2. **buy_8** - Buy 8 free spins (cost: 100x)
3. **buy_15** - Buy 15 free spins (cost: 200x)

### Free Spins Feature
- **Trigger:** 3+ SCATTER symbols
  - 3 scatters = 8 free spins
  - 4 scatters = 15 free spins
  - 5 scatters = 20 free spins
- **Retrigger:** 2+ SCATTER symbols during free spins

### Chip Collection & Symbol Upgrade System
During free spins, CHIP symbols (ID 13) can appear on the reels. Collecting chips upgrades medium symbols:

**Upgrade Thresholds:**
- 4 chips: M1 → M2
- 7 chips: M2 → M3
- 12 chips: M3 → M4
- 15 chips: M4 → DIAMOND

**Upgrade Progression:**
- Level 0: M1 (symbol ID 6)
- Level 1: M2 (symbol ID 7)
- Level 2: M3 (symbol ID 8)
- Level 3: M4 (symbol ID 9)
- Level 4: DIAMOND (symbol ID 10)

### Wild Multipliers
WILD symbols appear only during free spins on reels 2, 3, and 4. Each WILD has a multiplier of x2 or x3 that applies to wins on that reel.

## File Structure

### Core Game Files
```
src/game/
├── config.ts                    # Game configuration (symbols, modes, grid)
├── types.ts                     # TypeScript type definitions
├── typesBookEvent.ts           # BookEvent types matching math-sdk
├── typesEmitterEvent.ts        # EmitterEvent types for components
├── constants.ts                # Game constants and settings
├── assets.ts                   # Asset mappings (symbols, sounds, UI)
├── stateGame.svelte.ts         # Game state management
├── bookEventHandlerMap.ts      # BookEvent handlers
├── eventEmitter.ts             # Event emitter setup
├── context.ts                  # Svelte context setup
├── utils.ts                    # Utility functions
├── winLevelMap.ts              # Win level definitions
├── sound.ts                    # Sound configuration
├── actor.ts                    # XState actor setup
├── stateXstate.ts              # XState machine
├── stateLayout.ts              # Layout state
└── stateApp.ts                 # App state
```

### Components
```
src/components/
├── Game.svelte                 # Main game component
├── Board.svelte                # 5x4 game board
├── Symbol.svelte               # Symbol rendering
├── ChipCollector.svelte        # Chip collection UI (custom)
├── SymbolUpgrade.svelte        # Upgrade animation (custom)
├── WildMultiplier.svelte       # Wild multiplier display (custom)
├── FreeSpinCounter.svelte      # Free spin counter
├── FreeSpinIntro.svelte        # Free spin intro screen
├── FreeSpinOutro.svelte        # Free spin outro screen
├── Win.svelte                  # Win animations
├── Background.svelte           # Game background
├── BoardFrame.svelte           # Board frame/border
├── Anticipations.svelte        # Anticipation effects
├── Transition.svelte           # Screen transitions
├── LoadingScreen.svelte        # Loading screen
├── Sound.svelte                # Sound management
└── ... (other shared components)
```

### Storybook Test Data
```
src/stories/data/
├── base_books.ts               # Base game test books
├── base_events.ts              # Base game test events
├── bonus_books.ts              # Free spin test books
└── bonus_events.ts             # Free spin test events
```

### Storybook Stories
```
src/stories/
├── ComponentsGame.stories.svelte       # Game component tests
├── ComponentsSymbol.stories.svelte     # Symbol component tests
├── ModeBaseBook.stories.svelte         # Base game book tests
├── ModeBaseBookEvent.stories.svelte    # Base game event tests
├── ModeBonusBook.stories.svelte        # Free spin book tests
└── ModeBonusBookEvent.stories.svelte   # Free spin event tests
```

## BookEvent Types

### Standard Events (from math-sdk)
- **reveal**: Display new symbols on the board
- **winInfo**: Show winning combinations
- **setTotalWin**: Update total win amount
- **finalWin**: Final win for the round
- **freeSpinTrigger**: Trigger free spins
- **updateFreeSpin**: Update free spin counter
- **freeSpinEnd**: End free spins
- **setWin**: Set win with level

### Custom Events (Crypto Stacks Metavault)
- **CHIP_COLLECTION**: Collect CHIP symbols
- **SYMBOL_UPGRADE**: Upgrade symbols to next level
- **FREESPIN_STATE**: Update free spin state (chips, level, remaining)

## Synchronization with Math SDK

### Symbol ID Mapping
The frontend `SYMBOL_NAME_TO_ID` mapping in `assets.ts` matches exactly with the math-sdk symbol IDs:
```typescript
'9': 0, '10': 1, 'J': 2, 'Q': 3, 'K': 4, 'A': 5,
'M1': 6, 'M2': 7, 'M3': 8, 'M4': 9,
'DIAMOND': 10, 'SCATTER': 11, 'WILD': 12, 'CHIP': 13
```

### Game Modes
Frontend `betModes` in `config.ts` match math-sdk bet modes:
- base (cost: 1.0)
- buy_8 (cost: 100.0)
- buy_15 (cost: 200.0)

### Game State Fields
Frontend `stateGame` matches math-sdk `GameState`:
- `chipsCollected`: Number of chips collected
- `currentUpgradeLevel`: Current upgrade level (0-4)
- `fsRemaining`: Free spins remaining
- `gameType`: 'basegame' or 'freegame'

## Running the Game

### Development Mode
```bash
cd /workspace/web-sdk
pnpm install
pnpm run dev --filter=crypto-stacks-metavault
```
Access at: http://localhost:3002

### Storybook Mode
```bash
pnpm run storybook --filter=crypto-stacks-metavault
```
Access at: http://localhost:6002

### Build for Production
```bash
pnpm run build --filter=crypto-stacks-metavault
```
Output: `apps/crypto-stacks-metavault/.svelte-kit/output/`

## Testing in Storybook

### Component Tests
- `COMPONENTS/Game/component`: Test full game component
- `COMPONENTS/Symbol/component`: Test individual symbols

### Base Game Tests
- `MODE_BASE/book/random`: Test random base game books
- `MODE_BASE/bookEvent/reveal`: Test reveal event
- `MODE_BASE/bookEvent/winInfo`: Test win animations

### Free Spin Tests
- `MODE_BONUS/book/random`: Test random free spin books
- `MODE_BONUS/bookEvent/CHIP_COLLECTION`: Test chip collection
- `MODE_BONUS/bookEvent/SYMBOL_UPGRADE`: Test symbol upgrades
- `MODE_BONUS/bookEvent/FREESPIN_STATE`: Test free spin state

## Integration with Stake Engine RGS

### Authentication
The game uses the Stake Engine authentication system via the `Authenticate.svelte` component from `components-shared`.

### API Requests
- Uses `rgs-requests` package for RGS communication
- Handles bet placement, game rounds, and balance updates
- Supports resume functionality for interrupted games

### Deployment
1. Build the game: `pnpm run build --filter=crypto-stacks-metavault`
2. Collect output files from `.svelte-kit/output/`
3. Upload to Stake Engine Files page
4. Publish frontend
5. Test in Developer mode

## Key Features Implemented

✅ 5x4 grid with 1024 ways to win
✅ 14 symbols with correct IDs (0-13)
✅ 3 game modes (base, buy_8, buy_15)
✅ Free spins with scatter triggers
✅ Chip collection system
✅ Symbol upgrade progression (M1→M2→M3→M4→DIAMOND)
✅ Wild multipliers (x2/x3) on reels 2-4
✅ Complete bookEvent handlers
✅ Custom UI components (ChipCollector, SymbolUpgrade, WildMultiplier)
✅ Storybook test infrastructure
✅ Full synchronization with math-sdk

## Next Steps

1. **Asset Creation**: Create actual symbol images, backgrounds, and sound files
2. **Math SDK Integration**: Generate real books from math-sdk and replace test data
3. **Visual Polish**: Add animations, effects, and visual enhancements
4. **Sound Design**: Create and integrate game sounds
5. **Testing**: Comprehensive testing with real RGS data
6. **Deployment**: Deploy to Stake Engine platform

## Notes

- All file paths are relative to `/workspace/web-sdk/apps/crypto-stacks-metavault/`
- The game follows Stake Engine's TurboRepo monorepo structure
- Uses Svelte 5 with TypeScript
- PixiJS 8 for rendering
- XState for state management
- Follows the bookEvent/emitterEvent pattern for game flow