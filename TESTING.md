# How to Test the Swap Game on Mobile

## Quick Start

### Option 1: Test on Your Phone (Easiest - Recommended)

**This works on both iPhone and Android without any setup!**

1. **Install Expo Go app on your phone:**
   - iPhone: Download "Expo Go" from App Store
   - Android: Download "Expo Go" from Play Store

2. **Start the development server:**
   ```bash
   cd SwapMobile
   npm start
   ```

3. **Scan the QR code:**
   - **iPhone**: Open Camera app and point at the QR code in terminal
   - **Android**: Open Expo Go app and use the QR scanner

4. **Game will load on your phone!**

---

### Option 2: iOS Simulator (Mac only)

1. **Install Xcode** from Mac App Store (if not already installed)

2. **Start the development server:**
   ```bash
   cd SwapMobile
   npm start
   ```

3. **Press `i` in the terminal**
   - This will automatically open iOS Simulator and install the app

---

### Option 3: Android Emulator

1. **Install Android Studio** from https://developer.android.com/studio

2. **Create a virtual device:**
   - Open Android Studio
   - Tools → Device Manager
   - Create Device → Choose a phone (e.g., Pixel 4)
   - Download a system image (recommend latest API)
   - Finish setup and start the emulator

3. **Start the development server:**
   ```bash
   cd SwapMobile
   npm start
   ```

4. **Press `a` in the terminal**
   - This will install the app on the running emulator

---

## Detailed Instructions

### First Time Setup

Make sure you're in the SwapMobile directory:
```bash
cd "/Users/davaakhatanzorigtbaatar/Downloads/Private/2024/2025/CLassboxes/untitled folder/Projects/SwapMobile"
```

### Starting the Development Server

```bash
npm start
```

You'll see:
```
› Metro waiting on exp://192.168.x.x:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

### Testing on Physical Device (Recommended for Best Experience)

#### iPhone:
1. Open Camera app
2. Point at QR code in terminal
3. Tap the notification that appears
4. Expo Go will open with your game

#### Android:
1. Open Expo Go app
2. Tap "Scan QR Code"
3. Scan the QR code in terminal
4. Game will load

### Testing on Simulator/Emulator

#### iOS Simulator:
- Press `i` in the terminal
- Wait for simulator to boot (~30 seconds first time)
- App will automatically install and open

#### Android Emulator:
- Make sure emulator is running first
- Press `a` in the terminal
- Wait for app to build and install
- App will automatically open

---

## What to Test

Once the app is running, test these features:

### Basic Functionality
- [ ] App loads without errors
- [ ] Grid displays with 9 objects (different shades of gray)
- [ ] Objects are numbered 1-9 (lightest to darkest)
- [ ] HUD shows "SWAPS: 0 / 1" and "ENERGY: 0 / 3"
- [ ] Title shows "First Steps"
- [ ] Difficulty shows "1/5"

### Interactions
- [ ] Tap a cell - it highlights in blue
- [ ] Tap the same cell again - it deselects
- [ ] Tap another cell - objects swap
- [ ] Swaps counter increases
- [ ] Energy counter increases
- [ ] Only adjacent cells can be swapped (diagonal = error, selection changes)

### Game Logic
- [ ] Tutorial puzzle: Swap objects at (0,0) and (0,1)
- [ ] After swap, grid should be [1,2,3,4,5,6,7,8,9]
- [ ] "Puzzle Complete!" banner appears
- [ ] Can tap Reset button to restart

### Visual Feedback
- [ ] Selected cell has blue background
- [ ] Selected cell appears slightly larger
- [ ] Cells have shadows
- [ ] HUD shows orange text when over par

---

## Troubleshooting

### "Cannot find module" errors

If you see module errors when starting:
```bash
cd SwapMobile
rm -rf node_modules
npm install
npm start
```

### QR Code not working on iPhone

- Make sure you're on the same WiFi network as your computer
- Try pressing `w` to open in web browser first
- Check that Camera has permissions enabled

### Android emulator not detected

```bash
# Check if emulator is running
adb devices

# If no devices, start emulator from Android Studio
# Then try pressing 'a' again
```

### iOS Simulator crashes

```bash
# Reset the simulator
xcrun simctl erase all

# Try again
npm start
# Press 'i'
```

### "Expo Go" not compatible

If Expo Go says incompatible version:
```bash
cd SwapMobile
npm install expo@latest
npm start
```

### Metro bundler errors

```bash
# Clear Metro cache
cd SwapMobile
npx expo start --clear
```

---

## Expected Behavior

### Tutorial Puzzle ("First Steps")

**Starting state:**
```
┌───┬───┬───┐
│ 2 │ 1 │ 3 │  <- Objects 2 and 1 are swapped
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┴───┴───┘
```

**Solution:** Swap (0,0) with (0,1)
- Tap top-left cell (shows 2)
- Tap cell to its right (shows 1)
- Objects swap
- Energy used: 3 (because (2+1) × 1 = 3)
- Swaps used: 1
- Puzzle complete!

---

## Performance Tips

For best performance on physical devices:

1. **Close other apps** - free up memory
2. **Use release build for production** (current is dev mode)
3. **Physical device > Simulator** - runs faster on real hardware

---

## Next Steps After Testing

If everything works:
- ✓ Game is fully functional
- ✓ Ready to add more puzzles
- ✓ Ready to add animations
- ✓ Ready to publish to App Store/Play Store

If you encounter issues:
- Check console for error messages
- Look at the terminal output
- Try restarting the development server
- Clear cache with `npx expo start --clear`

---

## Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npx expo start --clear

# Run TypeScript check
npx tsc --noEmit

# Check what's running
ps aux | grep node

# Kill all node processes (if stuck)
killall node
```

---

**Ready to test?**

Run these commands:

```bash
cd SwapMobile
npm start
```

Then choose your testing method:
- Press `i` for iOS Simulator (Mac only)
- Press `a` for Android Emulator
- Scan QR code with phone for physical device testing (recommended!)

The game should load within 30 seconds and be fully playable!
