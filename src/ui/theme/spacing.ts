/**
 * Spacing system for Swap game
 * Consistent spacing scale for padding, margins, gaps
 */

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

// Grid-specific spacing
export const gridSpacing = {
  cellSize: 80,      // Size of each grid cell
  cellGap: 8,        // Gap between cells
  gridPadding: 16,   // Padding around the grid
} as const;
