/**
 * HUD - Heads-Up Display showing game stats
 * Displays swaps used, energy used, and par values
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, textStyles } from '../theme';

interface HUDProps {
  swapsUsed: number;
  energyUsed: number;
  parSwaps: number;
  parEnergy: number;
}

export function HUD({ swapsUsed, energyUsed, parSwaps, parEnergy }: HUDProps) {
  const swapsOverPar = swapsUsed > parSwaps;
  const energyOverPar = energyUsed > parEnergy;

  return (
    <View style={styles.container}>
      <View style={styles.stat}>
        <Text style={styles.label}>SWAPS</Text>
        <Text style={[styles.value, swapsOverPar && styles.overPar]}>
          {swapsUsed} / {parSwaps}
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.stat}>
        <Text style={styles.label}>ENERGY</Text>
        <Text style={[styles.value, energyOverPar && styles.overPar]}>
          {energyUsed} / {parEnergy}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    ...textStyles.label,
    color: colors.secondaryText,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  value: {
    ...textStyles.h3,
    color: colors.primaryText,
  },
  overPar: {
    color: colors.energyCost,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.background,
  },
});
