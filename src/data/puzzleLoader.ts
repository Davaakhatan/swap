/**
 * Puzzle loader utility
 * Loads and validates puzzle JSON files
 */

import { PuzzleDefinition } from '../domain/types';
import { validatePuzzle } from '../domain/validation';

// Import puzzles
// Note: In a real app with a bundler, you'd dynamically import these
// For now, we'll use require for Node.js compatibility
const puzzleIndex = require('./puzzles/index.json');

/**
 * Load a puzzle by ID
 */
export function loadPuzzle(puzzleId: string): PuzzleDefinition {
  const puzzleEntry = puzzleIndex.puzzles.find(
    (p: any) => p.id === puzzleId
  );

  if (!puzzleEntry) {
    throw new Error(`Puzzle not found: ${puzzleId}`);
  }

  // In a real app, this would be a dynamic import or fetch
  // For now, we'll construct the path
  const puzzlePath = `./puzzles/${puzzleEntry.path}`;
  const puzzle = require(puzzlePath) as PuzzleDefinition;

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
  return puzzleIndex.puzzles.map((entry: any) =>
    loadPuzzle(entry.id)
  );
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
  return puzzleIndex.puzzles.map((p: any) => p.id);
}

/**
 * Get next puzzle by difficulty progression
 */
export function getNextPuzzle(currentId: string): PuzzleDefinition | null {
  const ids = getAllPuzzleIds();
  const currentIndex = ids.indexOf(currentId);

  if (currentIndex === -1 || currentIndex === ids.length - 1) {
    return null; // No next puzzle
  }

  return loadPuzzle(ids[currentIndex + 1]);
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
