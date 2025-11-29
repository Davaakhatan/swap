/**
 * Energy cost calculations for Swap game
 * Formula: EnergyCost = (weight_a + weight_b) × Manhattan_distance
 */

import { Position, GameObject } from './types';

/**
 * Calculate Manhattan distance between two positions
 * Distance = |row1 - row2| + |col1 - col2|
 */
export function calculateManhattanDistance(
  posA: Position,
  posB: Position
): number {
  return Math.abs(posA.row - posB.row) + Math.abs(posA.col - posB.col);
}

/**
 * Calculate energy cost for swapping two objects
 * Cost = (weight_a + weight_b) × distance
 */
export function calculateEnergyCost(
  objectA: GameObject,
  posA: Position,
  objectB: GameObject,
  posB: Position
): number {
  const distance = calculateManhattanDistance(posA, posB);
  const combinedWeight = objectA.weight + objectB.weight;
  return combinedWeight * distance;
}

/**
 * Precomputed distance matrix for all positions on 3x3 grid
 * distances[fromRow][fromCol][toRow][toCol] = distance
 */
export const DISTANCE_MATRIX: number[][][][] = (() => {
  const matrix: number[][][][] = [];

  for (let r1 = 0; r1 < 3; r1++) {
    matrix[r1] = [];
    for (let c1 = 0; c1 < 3; c1++) {
      matrix[r1][c1] = [];
      for (let r2 = 0; r2 < 3; r2++) {
        matrix[r1][c1][r2] = [];
        for (let c2 = 0; c2 < 3; c2++) {
          matrix[r1][c1][r2][c2] = Math.abs(r1 - r2) + Math.abs(c1 - c2);
        }
      }
    }
  }

  return matrix;
})();

/**
 * Get precomputed distance (faster than calculating each time)
 */
export function getDistance(posA: Position, posB: Position): number {
  return DISTANCE_MATRIX[posA.row][posA.col][posB.row][posB.col];
}

/**
 * Calculate energy cost using precomputed distances
 */
export function calculateEnergyCostFast(
  weightA: number,
  posA: Position,
  weightB: number,
  posB: Position
): number {
  const distance = getDistance(posA, posB);
  return (weightA + weightB) * distance;
}

/**
 * Get minimum possible energy cost (lightest objects, distance 1)
 */
export function getMinimumEnergyCost(): number {
  return (1 + 1) * 1; // 2
}

/**
 * Get maximum possible energy cost (heaviest objects, distance 4)
 */
export function getMaximumEnergyCost(): number {
  return (9 + 9) * 4; // 72
}

/**
 * Estimate total energy for a number of swaps with average weights
 */
export function estimateEnergyForSwaps(
  numSwaps: number,
  avgWeight: number = 5,
  avgDistance: number = 1.5
): number {
  return Math.round(numSwaps * (avgWeight * 2) * avgDistance);
}
