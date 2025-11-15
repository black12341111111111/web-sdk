# Crypto Stacks Metavault - Symbol Reference

## Symbol ID Mapping

This document provides a quick reference for symbol IDs used in both the math-sdk and web-sdk.

### Symbol ID Table

| Symbol ID | Symbol Name | Type | Description | Appears In |
|-----------|-------------|------|-------------|------------|
| 0 | 9 | Low | Card symbol 9 | Base + FS |
| 1 | 10 | Low | Card symbol 10 | Base + FS |
| 2 | J | Low | Card symbol Jack | Base + FS |
| 3 | Q | Low | Card symbol Queen | Base + FS |
| 4 | K | Low | Card symbol King | Base + FS |
| 5 | A | Low | Card symbol Ace | Base + FS |
| 6 | M1 | Medium | Medium symbol 1 | Base + FS |
| 7 | M2 | Medium | Medium symbol 2 | Base + FS |
| 8 | M3 | Medium | Medium symbol 3 | Base + FS |
| 9 | M4 | Medium | Medium symbol 4 | Base + FS |
| 10 | DIAMOND | Premium | Premium symbol | Base + FS |
| 11 | SCATTER | Special | Triggers free spins | Base + FS |
| 12 | WILD | Special | Wild with multiplier (x2/x3) | FS only (reels 2-4) |
| 13 | CHIP | Special | Chip collection | FS only |

### Paytable (5x4 = 1024 Ways)

#### Premium Symbol
- **DIAMOND (10)**
  - 5 of a kind: 50x
  - 4 of a kind: 20x
  - 3 of a kind: 10x

#### Medium Symbols
- **M4 (9)**
  - 5 of a kind: 25x
  - 4 of a kind: 10x
  - 3 of a kind: 5x

- **M3 (8)**
  - 5 of a kind: 20x
  - 4 of a kind: 8x
  - 3 of a kind: 4x

- **M2 (7)**
  - 5 of a kind: 15x
  - 4 of a kind: 6x
  - 3 of a kind: 3x

- **M1 (6)**
  - 5 of a kind: 12x
  - 4 of a kind: 5x
  - 3 of a kind: 2.5x

#### Low Symbols
- **A (5)**
  - 5 of a kind: 10x
  - 4 of a kind: 4x
  - 3 of a kind: 2x

- **K (4)**
  - 5 of a kind: 8x
  - 4 of a kind: 3x
  - 3 of a kind: 1.5x

- **Q (3)**
  - 5 of a kind: 6x
  - 4 of a kind: 2.5x
  - 3 of a kind: 1x

- **J (2)**
  - 5 of a kind: 5x
  - 4 of a kind: 2x
  - 3 of a kind: 0.8x

- **10 (1)**
  - 5 of a kind: 4x
  - 4 of a kind: 1.5x
  - 3 of a kind: 0.6x

- **9 (0)**
  - 5 of a kind: 3x
  - 4 of a kind: 1.2x
  - 3 of a kind: 0.5x

### Special Symbol Behaviors

#### SCATTER (11)
- **Trigger:** 3+ anywhere on reels
- **Base Game:**
  - 3 scatters = 8 free spins
  - 4 scatters = 15 free spins
  - 5 scatters = 20 free spins
- **Free Spins (Retrigger):**
  - 2 scatters = +4 free spins
  - 3 scatters = +6 free spins
  - 4 scatters = +8 free spins
  - 5 scatters = +10 free spins

#### WILD (12)
- **Appears:** Free spins only, reels 2, 3, 4
- **Function:** Substitutes for all symbols except SCATTER and CHIP
- **Multiplier:** x2 or x3 (applies to wins on that reel)
- **Stacking:** Multiple wilds multiply together

#### CHIP (13)
- **Appears:** Free spins only
- **Function:** Collected to upgrade medium symbols
- **Upgrade Thresholds:**
  - 4 chips: M1 → M2
  - 7 chips: M2 → M3
  - 12 chips: M3 → M4
  - 15 chips: M4 → DIAMOND

### Upgrade System

The chip collection system upgrades medium symbols during free spins:

```
Level 0: M1 (ID 6)  ─[4 chips]→  Level 1: M2 (ID 7)
Level 1: M2 (ID 7)  ─[7 chips]→  Level 2: M3 (ID 8)
Level 2: M3 (ID 8)  ─[12 chips]→ Level 3: M4 (ID 9)
Level 3: M4 (ID 9)  ─[15 chips]→ Level 4: DIAMOND (ID 10)
```

**Important:** When a symbol is upgraded, ALL instances of that symbol on the board are upgraded to the new level for the remainder of the free spins feature.

### Code References

#### Math SDK
- Symbol IDs defined in: `math-sdk/games/crypto_stacks_metavault/game_config.py`
- Paytable in: `game_config.py` (self.paytable)
- Upgrade thresholds: `game_config.py` (self.chip_upgrade_thresholds)

#### Web SDK
- Symbol mapping: `src/game/assets.ts` (SYMBOL_ID_MAP, SYMBOL_NAME_TO_ID)
- Symbol config: `src/game/config.ts` (symbols)
- Upgrade constants: `src/game/constants.ts` (CHIP_UPGRADE_THRESHOLDS, UPGRADE_PROGRESSION)

### Verification Checklist

When integrating or testing, verify:
- [ ] Symbol IDs 0-13 match between math-sdk and web-sdk
- [ ] Paytable values match exactly
- [ ] WILD only appears in free spins on reels 2, 3, 4
- [ ] CHIP only appears in free spins
- [ ] Upgrade thresholds are [4, 7, 12, 15]
- [ ] Upgrade progression is [6, 7, 8, 9, 10]
- [ ] Wild multipliers are x2 or x3
- [ ] Scatter triggers match for base and free spins