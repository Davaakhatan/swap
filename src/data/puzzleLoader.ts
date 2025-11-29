/**
 * Puzzle loader utility
 * Loads and validates puzzle JSON files
 * React Native compatible - uses static imports
 */

import { PuzzleDefinition } from '../domain/types';
import { validatePuzzle } from '../domain/validation';

// Import all puzzles statically (React Native compatible)
import tutorial01 from './puzzles/tutorial/tutorial-01.json';
import easy01 from './puzzles/easy/easy-01.json';
import medium01 from './puzzles/medium/medium-01.json';
import hard01 from './puzzles/hard/hard-01.json';
import expert01 from './puzzles/expert/expert-01.json';

// Puzzle registry
const PUZZLES: Record<string, PuzzleDefinition> = {
  'tutorial-01': tutorial01 as PuzzleDefinition,
  'easy-01': easy01 as PuzzleDefinition,
  'medium-01': medium01 as PuzzleDefinition,
  'hard-01': hard01 as PuzzleDefinition,
  'expert-01': expert01 as PuzzleDefinition,
};

// Puzzle order for progression
const PUZZLE_ORDER = [
  'tutorial-01',
  'easy-01',
  'medium-01',
  'hard-01',
  'expert-01',
];

/**
 * Load a puzzle by ID
 */
export function loadPuzzle(puzzleId: string): PuzzleDefinition {
  const puzzle = PUZZLES[puzzleId];

  if (!puzzle) {
    throw new Error(`Puzzle not found: ${puzzleId}`);
  }

  // Validate puzzle
  const validation = validatePuzzle(puzzle);
  if (!validation.valid) {
    throw new Error(
      `Invalid puzzle ${puzzleId}: ${validation.errors.join(', ')}`
    );
  }

  return puzzle;
}

/**
 * Load all puzzles
 */
export function loadAllPuzzles(): PuzzleDefinition[] {
  return PUZZLE_ORDER.map(id => loadPuzzle(id));
}

/**
 * Get puzzles by difficulty
 */
export function getPuzzlesByDifficulty(
  difficulty: 1 | 2 | 3 | 4 | 5
): PuzzleDefinition[] {
  const allPuzzles = loadAllPuzzles();
  return allPuzzles.filter(p => p.difficulty === difficulty);
}

/**
 * Get puzzle IDs
 */
export function getAllPuzzleIds(): string[] {
  return PUZZLE_ORDER;
}

/**
 * Get next puzzle by difficulty progression
 */
export function getNextPuzzle(currentId: string): PuzzleDefinition | null {
  const currentIndex = PUZZLE_ORDER.indexOf(currentId);

  if (currentIndex === -1 || currentIndex === PUZZLE_ORDER.length - 1) {
    return null; // No next puzzle
  }

  return loadPuzzle(PUZZLE_ORDER[currentIndex + 1]);
}

/**
 * Get previous puzzle
 */
export function getPreviousPuzzle(currentId: string): PuzzleDefinition | null {
  const currentIndex = PUZZLE_ORDER.indexOf(currentId);

  if (currentIndex === -1 || currentIndex === 0) {
    return null; // No previous puzzle
  }

  return loadPuzzle(PUZZLE_ORDER[currentIndex - 1]);
}

/**
 * Get random puzzle of a specific difficulty
 */
export function getRandomPuzzle(
  difficulty?: 1 | 2 | 3 | 4 | 5
): PuzzleDefinition {
  const puzzles = difficulty
    ? getPuzzlesByDifficulty(difficulty)
    : loadAllPuzzles();

  if (puzzles.length === 0) {
    throw new Error('No puzzles available');
  }

  const randomIndex = Math.floor(Math.random() * puzzles.length);
  return puzzles[randomIndex];
}

/**
 * Validate all puzzles in the collection
 */
export function validateAllPuzzles(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  try {
    const puzzles = loadAllPuzzles();

    puzzles.forEach(puzzle => {
      const validation = validatePuzzle(puzzle);
      if (!validation.valid) {
        errors.push(`Puzzle ${puzzle.id}: ${validation.errors.join(', ')}`);
      }
    });
  } catch (error) {
    errors.push(`Failed to load puzzles: ${error}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
