# Syndicate Surge - Cyberpunk Heist Slot Game

A high-tech slot game built with Stake Engine's Web SDK, featuring multipliers, sticky wilds, free spins, and a thrilling heist bonus game.

## 🎰 Game Features

- **5x4 Reel Layout**: 5 reels with 4 rows for maximum action
- **Sticky Wilds**: Wild symbols that stick on reels for consecutive wins
- **Progressive Multipliers**: Build multipliers up to 10x during gameplay
- **Syndicate Spins**: Free spins feature triggered by scatter symbols
- **Heist Bonus**: Pick-em style bonus game for big wins
- **Cyberpunk Theme**: Futuristic heist aesthetic with neon visuals

## 🏗️ Architecture

This game follows **Stake Engine's strict architectural patterns**:

### Event-Driven Architecture
```
RGS → Book → BookEvents → BookEventHandlers → EmitterEvents → Components
```

1. **Book**: Game data from RGS (Remote Game Server)
2. **BookEvents**: Array of events in the book (reveal, win, bonus, etc.)
3. **BookEventHandlers**: Convert bookEvents to emitterEvents
4. **EmitterEvents**: UI-specific events that components subscribe to
5. **Components**: Svelte components that react to emitterEvents

### Context System

Four main contexts following Stake pattern:
- **ContextEventEmitter**: Event broadcasting/subscription
- **ContextXstate**: Finite state machine for game states
- **ContextLayout**: Responsive layout management
- **ContextApp**: PixiJS application and asset loading

### File Structure

```
src/
├── components/          # Svelte components
│   ├── Game.svelte     # Main game component (orchestrator)
│   ├── Symbol.svelte   # Individual symbol rendering
│   ├── LoadingScreen.svelte
│   ├── ControlButton.svelte
│   └── ...             # Other feature components
│
├── game/               # Game logic (JavaScript scope)
│   ├── context.ts      # Context setup (setContext/getContext)
│   ├── eventEmitter.ts # Event emitter instance
│   ├── stateGame.svelte.ts  # Main game state
│   ├── stateXstate.ts  # XState machine
│   ├── stateLayout.ts  # Layout state
│   ├── stateApp.ts     # PixiJS app state
│   ├── assets.ts       # Asset manifest
│   ├── constants.ts    # Game constants
│   ├── types.ts        # TypeScript types
│   ├── typesBookEvent.ts    # BookEvent union types
│   ├── typesEmitterEvent.ts # EmitterEvent union types
│   └── bookEventHandlerMap.ts  # BookEvent → EmitterEvent handlers
│
├── stories/            # Storybook tests
│   ├── ComponentsGame.stories.svelte
│   ├── ComponentsSymbol.stories.svelte
│   └── data/          # Mock book data for testing
│
└── routes/            # SvelteKit routes
    └── +page.svelte   # Entry point
```

## 🚀 Getting Started

### Prerequisites

```bash
# Node.js v22.16.0
nvm install 22.16.0
nvm use 22.16.0

# pnpm v10.5.0
npm install -g pnpm@10.5.0
```

### Installation

```bash
# Install dependencies (from workspace root)
cd web-sdk
pnpm install
```

### Run in Storybook (Development)

```bash
# Run storybook for component testing
pnpm run storybook --filter=surge
```

This opens Storybook for isolated component testing:
- Test individual components (Symbol, Game, etc.)
- Test with mock bookEvents
- Test with complete book sequences

### Run in DEV Mode

```bash
# Run in development mode
pnpm run dev --filter=surge
```

**Note**: You'll need RGS credentials in the URL query string to play in DEV mode.

### Build for Production

```bash
# Build the game
pnpm run build --filter=surge
```

Output location: `apps/surge/.svelte-kit/output/`

Upload to Stake Engine:
1. Copy `prerendered/pages/index.html` to build folder
2. Copy all files from `client/` to build folder
3. Upload to Stake Engine Files page
4. Publish Frontend

## 📚 Key Concepts

### Task Breakdown Philosophy

**Break complex features into atomic tasks (emitterEvents)**

Example: A complex "reveal" bookEvent might be broken down into:
1. `boardSpinStart` - Start reel spinning
2. `boardSpinStop` - Stop each reel
3. `symbolLand` - Individual symbol landing
4. `boardSettle` - Final board state

Each task is:
- **Testable in isolation** (via Storybook)
- **Single responsibility** (SOLID principles)
- **Asynchronous when needed** (wait for animations)

### Union Types Pattern

All bookEvents and emitterEvents use **TypeScript union types**:

```typescript
// BookEvent union type
export type BookEvent = 
  | BookEventReveal 
  | BookEventWin 
  | BookEventMultiplier
  | ...;

// EmitterEvent union type
export type EmitterEvent = 
  | { type: 'boardSpin', board: RawSymbol[][] }
  | { type: 'showWin', amount: number }
  | ...;
```

This provides:
- **Type safety** with intellisense
- **Exhaustive checking** in handlers
- **Self-documenting code**

### Component Pattern

Each component:
1. Exports its EmitterEvent types
2. Subscribes to events in `subscribeOnMount`
3. Handles events with minimal logic
4. Uses Svelte reactivity for UI updates

```svelte
<script lang="ts" module>
  export type EmitterEventBoard = 
    | { type: 'boardShow' }
    | { type: 'boardHide' };
</script>

<script lang="ts">
  const context = getContext();
  
  context.eventEmitter.subscribeOnMount({
    boardShow: () => (show = true),
    boardHide: () => (show = false),
  });
</script>
```

## 🧪 Testing Strategy

### Storybook Stories

Following Stake pattern, create stories for:

1. **COMPONENTS/[Component]/component** - Test component in isolation
2. **COMPONENTS/[Component]/[state]** - Test all component states
3. **MODE_BASE/bookEvent/[eventType]** - Test individual bookEvents
4. **MODE_BASE/book/random** - Test complete game flow
5. **MODE_BONUS/...** - Test bonus features

### Testing Workflow

1. Create component in Storybook first
2. Test with mock data and controls
3. Implement bookEvent handlers
4. Test bookEvents individually
5. Test in complete book sequence

## 📖 Additional Resources

- [Stake Engine Documentation](https://stakeengine.github.io/math-sdk/)
- [Main Web SDK README](../../README.md)
- [PixiJS Documentation](https://pixijs.download/release/docs/index.html)
- [Svelte 5 Documentation](https://svelte.dev/docs/svelte/overview)

## 🎮 Symbol Reference

### High-Paying Symbols
- **H1** - Blonde Business Person
- **H2** - Elder Mastermind  
- **H3** - Bald Enforcer

### Medium-Paying Symbols
- **M1** - Briefcase
- **M2** - Revolver
- **M3** - Helmet/Mask

### Low-Paying Symbols
- **L1** - Ace (A)
- **L2** - King (K)
- **L3** - Queen (Q)
- **L4** - Jack (J)
- **L5** - Ten (10)
- **L6** - Nine (9)

### Special Symbols
- **W** - Wild (Diamond)
- **SC** - Scatter (Skull) - Triggers Syndicate Spins
- **BN** - Bonus (Cash) - Triggers Heist Bonus
- **P** - Prize Symbol (Dollar Sign)

## 🔧 Development Tips

1. **Always set context at entry point** (`+page.svelte` or story files)
2. **Use union types** for all event types
3. **Follow single responsibility** - each emitterEvent does ONE thing
4. **Test in Storybook first** before integrating with RGS
5. **Use async/await** for animations that need to complete before next event
6. **Keep bookEventHandlers thin** - they should mostly just broadcast emitterEvents
7. **Use TypeScript intellisense** - the union types give you autocomplete

## 📝 Next Steps

To complete the game, implement:

1. **Board Component** - Main reel display with spinning logic
2. **Win Animations** - Symbol highlighting and win displays
3. **Multiplier Display** - Visual multiplier tracking
4. **Sticky Wilds Display** - Show active sticky wild positions
5. **Free Spin Components** - Intro, counter, outro
6. **Heist Bonus Component** - Pick-em bonus game
7. **Sound System** - Integrate Howler.js for audio
8. **Background Component** - Animated cyberpunk background
9. **Additional Stories** - bookEvent and book-level stories
10. **Math Integration** - Connect to actual book data from Math SDK

---

**Built with Stake Engine Web SDK** - Following strict architectural patterns for maintainable, testable slot games.
