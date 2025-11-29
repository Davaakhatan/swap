/**
 * Color palette for Swap game
 * Based on design-spec.md
 */

export const colors = {
  // Base colors
  background: '#FAFAFA',  // Off-white background
  surface: '#FFFFFF',      // Pure white for cards
  primaryText: '#1A1A1A',  // Near-black text
  secondaryText: '#757575', // Medium gray text

  // UI accent colors
  energyCost: '#FF6B35',   // Orange for energy
  success: '#4CAF50',      // Green for success
  selection: '#2196F3',    // Blue for selection

  // Object colors (weight-based grayscale)
  // Light objects (weights 1-3)
  object1: '#F5F5F5',  // Lightest
  object2: '#EEEEEE',
  object3: '#DADADA',

  // Medium objects (weights 4-6)
  object4: '#BDBDBD',
  object5: '#9E9E9E',
  object6: '#757575',

  // Heavy objects (weights 7-9)
  object7: '#616161',
  object8: '#424242',
  object9: '#212121',  // Darkest
} as const;

// Helper function to get object color by weight
export function getObjectColor(weight: number): string {
  if (weight < 1 || weight > 9) {
    throw new Error(`Invalid weight: ${weight}. Must be 1-9.`);
  }
  return colors[`object${weight}` as keyof typeof colors];
}
