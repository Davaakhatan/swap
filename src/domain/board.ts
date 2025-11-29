/**
 * Board operations for Swap game
 * Pure functions - no side effects
 */

import { BoardState, Position } from './types';

/**
 * Get object ID at a specific position
 */
export function getObjectAt(board: BoardState, pos: Position): number {
  return board.grid[pos.row][pos.col];
}

/**
 * Create a new board with an object at a specific position
 * Returns a new board (immutable)
 */
export function setObjectAt(
  board: BoardState,
  pos: Position,
  objectId: number
): BoardState {
  const newGrid = board.grid.map((row, rowIndex) =>
    row.map((cell, colIndex) =>
      rowIndex === pos.row && colIndex === pos.col ? objectId : cell
    )
  );

  return { grid: newGrid };
}

/**
 * Swap two objects on the board
 * Returns a new board (immutable)
 */
export function swap(
  board: BoardState,
  posA: Position,
  posB: Position
): BoardState {
  const objectA = getObjectAt(board, posA);
  const objectB = getObjectAt(board, posB);

  let newBoard = setObjectAt(board, posA, objectB);
  newBoard = setObjectAt(newBoard, posB, objectA);

  return newBoard;
}

/**
 * Clone a board (deep copy)
 */
export function cloneBoard(board: BoardState): BoardState {
  return {
    grid: board.grid.map(row => [...row]),
  };
}

/**
 * Check if two boards are equal
 */
export function boardsEqual(boardA: BoardState, boardB: BoardState): boolean {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (boardA.grid[row][col] !== boardB.grid[row][col]) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Check if current board matches any target pattern
 */
export function isCompleted(
  currentBoard: BoardState,
  targetPatterns: BoardState[]
): boolean {
  return targetPatterns.some(pattern => boardsEqual(currentBoard, pattern));
}

/**
 * Convert flat array to 3x3 grid
 */
export function flatToGrid(cells: number[]): number[][] {
  if (cells.length !== 9) {
    throw new Error('Flat array must have exactly 9 elements');
  }

  return [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
  ];
}

/**
 * Convert 3x3 grid to flat array
 */
export function gridToFlat(grid: number[][]): number[] {
  if (grid.length !== 3 || grid.some(row => row.length !== 3)) {
    throw new Error('Grid must be 3x3');
  }

  return grid.flat();
}

/**
 * Get all positions on the board
 */
export function getAllPositions(): Position[] {
  const positions: Position[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      positions.push({ row: row as 0 | 1 | 2, col: col as 0 | 1 | 2 });
    }
  }
  return positions;
}

/**
 * Check if a position is valid (on the board)
 */
export function isValidPosition(pos: Position): boolean {
  return pos.row >= 0 && pos.row < 3 && pos.col >= 0 && pos.col < 3;
}

/**
 * Get adjacent positions (up, down, left, right)
 */
export function getAdjacentPositions(pos: Position): Position[] {
  const adjacent: Position[] = [];

  // Up
  if (pos.row > 0) {
    adjacent.push({ row: (pos.row - 1) as 0 | 1 | 2, col: pos.col });
  }

  // Down
  if (pos.row < 2) {
    adjacent.push({ row: (pos.row + 1) as 0 | 1 | 2, col: pos.col });
  }

  // Left
  if (pos.col > 0) {
    adjacent.push({ row: pos.row, col: (pos.col - 1) as 0 | 1 | 2 });
  }

  // Right
  if (pos.col < 2) {
    adjacent.push({ row: pos.row, col: (pos.col + 1) as 0 | 1 | 2 });
  }

  return adjacent;
}
