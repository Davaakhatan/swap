/**
 * Core type definitions for Swap game
 * Pure TypeScript - no framework dependencies
 */

// Position on the 3x3 grid
export interface Position {
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
}

// Game object with weight and visual properties
export interface GameObject {
  id: number; // 1-9
  weight: number; // 1-9
  shape: string; // Icon/shape identifier
}

// Board state - 3x3 grid of object IDs
export interface BoardState {
  grid: number[][]; // 3x3 array of object IDs (1-9)
}

// Alternative flat board representation
export interface BoardStateFlat {
  cells: number[]; // Length-9 array, row-major order
}

// Puzzle definition
export interface PuzzleDefinition {
  id: string;
  name: string;
  difficulty: 1 | 2 | 3 | 4 | 5; // 1=Tutorial, 5=Expert
  startBoard: BoardState;
  targetPatterns: BoardState[];
  par: {
    swaps: number;
    energy: number;
  };
  hints?: string[];
  createdAt: string; // ISO 8601 timestamp
}

// Game state during play
export interface GameState {
  puzzle: PuzzleDefinition;
  currentBoard: BoardState;
  swapsUsed: number;
  energyUsed: number;
  moveHistory: Move[];
  isCompleted: boolean;
}

// Single move/swap action
export interface Move {
  from: Position;
  to: Position;
  energyCost: number;
  timestamp: number;
}

// Best score for a puzzle
export interface BestScore {
  puzzleId: string;
  bestSwaps: number;
  bestEnergy: number;
  achievedAt: string;
}

// Validation result
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// Settings
export interface Settings {
  soundEnabled: boolean;
  hapticsEnabled: boolean;
  tutorialCompleted: boolean;
}
