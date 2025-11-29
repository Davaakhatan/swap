/**
 * ObjectIcon - Renders a geometric shape for each object (1-9)
 * Based on design-spec.md
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { getObjectColor } from '../theme';

interface ObjectIconProps {
  objectId: number;
  size?: number;
}

export function ObjectIcon({ objectId, size = 48 }: ObjectIconProps) {
  const color = getObjectColor(objectId);
  const borderColor = objectId <= 3 ? '#BDBDBD' : 'transparent';

  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          backgroundColor: color,
          borderColor,
          borderWidth: objectId <= 3 ? 1 : 0,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
