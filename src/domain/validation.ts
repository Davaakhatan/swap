/**
 * Validation logic for boards and puzzles
 */

import { BoardState, PuzzleDefinition, ValidationResult, Position } from './types';
import { boardsEqual } from './board';

/**
 * Check if a board is valid
 * Rules:
 * - Must be 3x3
 * - Must contain all IDs 1-9 exactly once
 * - No duplicates, no gaps
 */
export function isValidBoard(board: BoardState): boolean {
  // Check dimensions
  if (board.grid.length !== 3) {
    return false;
  }

  if (board.grid.some(row => row.length !== 3)) {
    return false;
  }

  // Collect all IDs
  const ids = board.grid.flat();

  // Check length
  if (ids.length !== 9) {
    return false;
  }

  // Check all IDs 1-9 are present exactly once
  const sorted = [...ids].sort((a, b) => a - b);
  for (let i = 0; i < 9; i++) {
    if (sorted[i] !== i + 1) {
      return false;
    }
  }

  return true;
}

/**
 * Check if a position is valid (within 3x3 grid)
 */
export function isValidPosition(pos: Position): boolean {
  return (
    Number.isInteger(pos.row) &&
    Number.isInteger(pos.col) &&
    pos.row >= 0 &&
    pos.row < 3 &&
    pos.col >= 0 &&
    pos.col < 3
  );
}

/**
 * Validate a puzzle definition
 */
export function validatePuzzle(
  puzzle: PuzzleDefinition
): ValidationResult {
  const errors: string[] = [];

  // Check ID
  if (!puzzle.id || typeof puzzle.id !== 'string') {
    errors.push('Puzzle must have a valid string ID');
  }

  // Check name
  if (!puzzle.name || typeof puzzle.name !== 'string') {
    errors.push('Puzzle must have a valid name');
  }

  // Check difficulty
  if (
    typeof puzzle.difficulty !== 'number' ||
    puzzle.difficulty < 1 ||
    puzzle.difficulty > 5
  ) {
    errors.push('Difficulty must be 1-5');
  }

  // Validate start board
  if (!isValidBoard(puzzle.startBoard)) {
    errors.push('Invalid start board');
  }

  // Validate target patterns
  if (!puzzle.targetPatterns || puzzle.targetPatterns.length === 0) {
    errors.push('At least one target pattern required');
  } else {
    puzzle.targetPatterns.forEach((target, index) => {
      if (!isValidBoard(target)) {
        errors.push(`Invalid target pattern at index ${index}`);
      }
    });
  }

  // Check start != target (puzzle should not be trivial)
  if (
    puzzle.targetPatterns &&
    puzzle.targetPatterns.length > 0 &&
    boardsEqual(puzzle.startBoard, puzzle.targetPatterns[0])
  ) {
    errors.push('Start board cannot equal target pattern');
  }

  // Validate par values
  if (!puzzle.par) {
    errors.push('Puzzle must have par values');
  } else {
    if (
      typeof puzzle.par.swaps !== 'number' ||
      puzzle.par.swaps < 1 ||
      !Number.isInteger(puzzle.par.swaps)
    ) {
      errors.push('Par swaps must be a positive integer');
    }

    if (
      typeof puzzle.par.energy !== 'number' ||
      puzzle.par.energy < 1 ||
      !Number.isInteger(puzzle.par.energy)
    ) {
      errors.push('Par energy must be a positive integer');
    }
  }

  // Check created timestamp
  if (!puzzle.createdAt || typeof puzzle.createdAt !== 'string') {
    errors.push('Puzzle must have a createdAt timestamp');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if an object ID is valid (1-9)
 */
export function isValidObjectId(id: number): boolean {
  return Number.isInteger(id) && id >= 1 && id <= 9;
}

/**
 * Check if a weight is valid (1-9)
 */
export function isValidWeight(weight: number): boolean {
  return Number.isInteger(weight) && weight >= 1 && weight <= 9;
}

/**
 * Check if two positions are the same
 */
export function positionsEqual(posA: Position, posB: Position): boolean {
  return posA.row === posB.row && posA.col === posB.col;
}

/**
 * Check if a swap is valid (positions are different and valid)
 */
export function isValidSwap(posA: Position, posB: Position): boolean {
  return (
    isValidPosition(posA) &&
    isValidPosition(posB) &&
    !positionsEqual(posA, posB)
  );
}
