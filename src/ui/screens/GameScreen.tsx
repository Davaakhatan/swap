/**
 * GameScreen - Main game interface
 * Shows grid, HUD, and handles game interactions
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { GridView } from '../components/GridView';
import { HUD } from '../components/HUD';
import { useGameStore } from '../../store/gameStore';
import { colors, spacing, textStyles } from '../theme';

export function GameScreen() {
  const gameState = useGameStore((state) => state.gameState);
  const selectedPosition = useGameStore((state) => state.selectedPosition);
  const startPuzzle = useGameStore((state) => state.startPuzzle);
  const selectCell = useGameStore((state) => state.selectCell);
  const reset = useGameStore((state) => state.reset);

  // Load first puzzle on mount
  useEffect(() => {
    startPuzzle('tutorial-01');
  }, [startPuzzle]);

  if (!gameState) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const { puzzle, currentBoard, swapsUsed, energyUsed, isCompleted } = gameState;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{puzzle.name}</Text>
          <Text style={styles.difficulty}>
            Difficulty: {puzzle.difficulty}/5
          </Text>
        </View>

        {/* HUD */}
        <HUD
          swapsUsed={swapsUsed}
          energyUsed={energyUsed}
          parSwaps={puzzle.par.swaps}
          parEnergy={puzzle.par.energy}
        />

        {/* Grid */}
        <View style={styles.gridContainer}>
          <GridView
            grid={currentBoard.grid}
            selectedPosition={selectedPosition}
            onCellPress={selectCell}
          />
        </View>

        {/* Completion Message */}
        {isCompleted && (
          <View style={styles.completionBanner}>
            <Text style={styles.completionText}>Puzzle Complete!</Text>
          </View>
        )}

        {/* Reset Button */}
        <TouchableOpacity style={styles.resetButton} onPress={reset}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...textStyles.h2,
    color: colors.secondaryText,
  },
  header: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    ...textStyles.h2,
    color: colors.primaryText,
  },
  difficulty: {
    ...textStyles.caption,
    color: colors.secondaryText,
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionBanner: {
    backgroundColor: colors.success,
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: 'center',
  },
  completionText: {
    ...textStyles.h3,
    color: colors.surface,
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  resetButtonText: {
    ...textStyles.body,
    color: colors.primaryText,
    fontWeight: '600',
  },
});
