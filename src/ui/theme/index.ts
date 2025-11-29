/**
 * Theme system - Central export for all theme tokens
 */

import { colors as colorsImport } from './colors';
import { typography as typographyImport } from './typography';
import { spacing as spacingImport, gridSpacing as gridSpacingImport } from './spacing';

export { colors, getObjectColor } from './colors';
export { typography, textStyles } from './typography';
export { spacing, gridSpacing } from './spacing';

// Combined theme object
export const theme = {
  colors: colorsImport,
  typography: typographyImport,
  spacing: spacingImport,
  gridSpacing: gridSpacingImport,
} as const;

export type Theme = typeof theme;
