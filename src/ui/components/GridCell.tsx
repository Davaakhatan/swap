/**
 * GridCell - Individual cell in the 3x3 grid
 * Handles tap selection and visual feedback
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { ObjectIcon } from './ObjectIcon';
import { colors, spacing, gridSpacing } from '../theme';

interface GridCellProps {
  objectId: number;
  isSelected: boolean;
  onPress: () => void;
}

export function GridCell({ objectId, isSelected, onPress }: GridCellProps) {
  return (
    <TouchableOpacity
      style={[
        styles.cell,
        isSelected && styles.selectedCell,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <ObjectIcon objectId={objectId} size={gridSpacing.cellSize * 0.6} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: gridSpacing.cellSize,
    height: gridSpacing.cellSize,
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedCell: {
    backgroundColor: colors.selection,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    transform: [{ scale: 1.05 }],
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
