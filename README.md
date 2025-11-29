# Swap - Minimalist Puzzle Game

A mobile puzzle game built with React Native and Expo. Swap objects on a 3×3 grid to match target patterns while optimizing for minimum swaps and energy cost.

## Quick Start

### Run on Your Phone (Easiest)

1. Install **Expo Go** app on your phone
2. Run the development server:
   ```bash
   cd SwapMobile
   npm start
   ```
3. Scan the QR code with your phone
4. Game loads in ~30 seconds!

### Run on Simulator

```bash
cd SwapMobile
npm start

# Then press:
# 'i' for iOS Simulator (Mac only)
# 'a' for Android Emulator
# 'w' for Web Browser
```

## Game Features

- **3×3 Grid**: 9 permanent objects with weights 1-9
- **Swap Mechanics**: Tap two cells to swap objects
- **Energy System**: Each swap costs energy based on object weights
- **5 Puzzles**: Tutorial through Expert difficulty
- **Track Progress**: See swaps and energy vs par

## Tech Stack

- **React Native** + **Expo** - Cross-platform mobile framework
- **TypeScript** - Type-safe development
- **Zustand** - State management
- **React Native Reanimated** - Smooth animations (ready to use)

## Project Structure

```
SwapMobile/
├── App.tsx                 # Entry point
├── src/
│   ├── domain/            # Core game logic (pure TypeScript)
│   ├── data/              # Puzzles and game data
│   ├── ui/
│   │   ├── components/    # Reusable UI components
│   │   ├── screens/       # Game screens
│   │   └── theme/         # Design system
│   └── store/             # Zustand state management
├── TESTING.md             # How to test on devices
└── IMPLEMENTATION.md      # Technical documentation
```

## Documentation

- **[TESTING.md](TESTING.md)** - How to run and test the game
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Technical details

## Development

### Prerequisites

- Node.js 20+
- npm or yarn
- Expo CLI (installed automatically)

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm start
```

## How to Play

1. **Select a cell** - Tap any cell on the 3×3 grid
2. **Select another cell** - Tap a second cell to swap
3. **Match the target** - Arrange objects to match the target pattern
4. **Optimize** - Try to beat par for swaps and energy!

## Game Mechanics

### Energy Formula

```
Energy = (weight_a + weight_b) × distance
```

**Example**: Swapping weight-2 and weight-1 (adjacent)
- Energy = (2 + 1) × 1 = **3**

## Puzzles

| ID | Name | Difficulty | Par Swaps | Par Energy |
|----|------|------------|-----------|------------|
| tutorial-01 | First Steps | 1/5 | 1 | 3 |
| easy-01 | Sort the Top | 2/5 | 3 | 12 |
| medium-01 | Corner Rotation | 3/5 | 6 | 64 |
| hard-01 | Mirror Image | 4/5 | 10 | 120 |
| expert-01 | The Gauntlet | 5/5 | 14 | 180 |

## Status

✅ **Complete and Working**
- All core game logic implemented
- UI components built and styled
- 5 puzzles ready to play
- State management with Zustand
- TypeScript compilation: 0 errors

## GitHub Repository

https://github.com/Davaakhatan/swap

---

**Ready to play!** Run `npm start` and enjoy the game!
