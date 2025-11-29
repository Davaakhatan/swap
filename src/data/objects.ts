/**
 * Game object definitions
 * 9 objects with weights 1-9 and geometric shapes
 */

import { GameObject } from '../domain/types';

// Object definitions - id and weight match, shapes vary by weight
export const GAME_OBJECTS: Record<number, GameObject> = {
  1: { id: 1, weight: 1, shape: 'small-circle' },
  2: { id: 2, weight: 2, shape: 'small-triangle' },
  3: { id: 3, weight: 3, shape: 'small-square' },
  4: { id: 4, weight: 4, shape: 'medium-pentagon' },
  5: { id: 5, weight: 5, shape: 'medium-hexagon' },
  6: { id: 6, weight: 6, shape: 'medium-star' },
  7: { id: 7, weight: 7, shape: 'large-octagon' },
  8: { id: 8, weight: 8, shape: 'large-diamond' },
  9: { id: 9, weight: 9, shape: 'large-circle' },
};

/**
 * Get object by ID
 */
export function getObject(id: number): GameObject {
  const obj = GAME_OBJECTS[id];
  if (!obj) {
    throw new Error(`Invalid object ID: ${id}`);
  }
  return obj;
}

/**
 * Get all objects
 */
export function getAllObjects(): GameObject[] {
  return Object.values(GAME_OBJECTS);
}

/**
 * Get object weight by ID
 */
export function getWeight(id: number): number {
  return getObject(id).weight;
}

/**
 * Get object shape by ID
 */
export function getShape(id: number): string {
  return getObject(id).shape;
}

/**
 * Object visual properties (for UI)
 * These match the design-spec.md
 */
export interface ObjectVisualProps {
  size: number; // Points diameter/height
  color: string; // Hex color (weight-based grayscale)
  description: string;
}

export const OBJECT_VISUALS: Record<number, ObjectVisualProps> = {
  1: { size: 24, color: '#F5F5F5', description: 'Small circle - lightest' },
  2: { size: 26, color: '#E8E8E8', description: 'Small triangle' },
  3: { size: 24, color: '#DADADA', description: 'Small square' },
  4: { size: 32, color: '#BDBDBD', description: 'Medium pentagon' },
  5: { size: 34, color: '#9E9E9E', description: 'Medium hexagon' },
  6: { size: 36, color: '#757575', description: 'Medium star' },
  7: { size: 42, color: '#616161', description: 'Large octagon' },
  8: { size: 44, color: '#424242', description: 'Large diamond' },
  9: { size: 48, color: '#212121', description: 'Large circle - heaviest' },
};

/**
 * Get visual properties for an object
 */
export function getObjectVisuals(id: number): ObjectVisualProps {
  const visuals = OBJECT_VISUALS[id];
  if (!visuals) {
    throw new Error(`Invalid object ID: ${id}`);
  }
  return visuals;
}
