/**
 * GridView - 3x3 grid of game objects
 * Manages cell selection and swap interactions
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GridCell } from './GridCell';
import { colors, spacing, gridSpacing } from '../theme';
import type { Position } from '../../domain/types';

interface GridViewProps {
  grid: number[][];
  selectedPosition: Position | null;
  onCellPress: (position: Position) => void;
}

export function GridView({ grid, selectedPosition, onCellPress }: GridViewProps) {
  return (
    <View style={styles.container}>
      {grid.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((objectId, colIndex) => {
            const position: Position = { row: rowIndex as 0 | 1 | 2, col: colIndex as 0 | 1 | 2 };
            const isSelected =
              selectedPosition?.row === rowIndex && selectedPosition?.col === colIndex;

            return (
              <GridCell
                key={`${rowIndex}-${colIndex}`}
                objectId={objectId}
                isSelected={isSelected}
                onPress={() => onCellPress(position)}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: gridSpacing.gridPadding,
    borderRadius: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: gridSpacing.cellGap,
    marginBottom: gridSpacing.cellGap,
  },
});
