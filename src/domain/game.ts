/**
 * Game state management functions
 * Pure functions for managing game state
 */

import { GameState, PuzzleDefinition, Position, Move } from './types';
import { swap, isCompleted, cloneBoard } from './board';
import { calculateEnergyCost } from './energy';
import { getObject } from '../data/objects';
import { isValidSwap } from './validation';

/**
 * Initialize a new game from a puzzle
 */
export function initGame(puzzle: PuzzleDefinition): GameState {
  return {
    puzzle,
    currentBoard: cloneBoard(puzzle.startBoard),
    swapsUsed: 0,
    energyUsed: 0,
    moveHistory: [],
    isCompleted: false,
  };
}

/**
 * Apply a move to the game state
 * Returns new game state (immutable)
 */
export function applyMove(
  state: GameState,
  posA: Position,
  posB: Position
): GameState {
  // Validate swap
  if (!isValidSwap(posA, posB)) {
    throw new Error('Invalid swap positions');
  }

  // Get objects at positions
  const objA = getObject(state.currentBoard.grid[posA.row][posA.col]);
  const objB = getObject(state.currentBoard.grid[posB.row][posB.col]);

  // Calculate energy cost
  const energyCost = calculateEnergyCost(objA, posA, objB, posB);

  // Perform swap
  const newBoard = swap(state.currentBoard, posA, posB);

  // Create move record
  const move: Move = {
    from: posA,
    to: posB,
    energyCost,
    timestamp: Date.now(),
  };

  // Check completion
  const completed = isCompleted(newBoard, state.puzzle.targetPatterns);

  return {
    ...state,
    currentBoard: newBoard,
    swapsUsed: state.swapsUsed + 1,
    energyUsed: state.energyUsed + energyCost,
    moveHistory: [...state.moveHistory, move],
    isCompleted: completed,
  };
}

/**
 * Reset game to initial state
 */
export function resetGame(state: GameState): GameState {
  return initGame(state.puzzle);
}

/**
 * Undo last move
 * Returns new game state with last move removed
 */
export function undoMove(state: GameState): GameState {
  if (state.moveHistory.length === 0) {
    return state;
  }

  // Rebuild state from scratch by replaying all moves except the last one
  const movesToReplay = state.moveHistory.slice(0, -1);
  let newState = initGame(state.puzzle);

  for (const move of movesToReplay) {
    newState = applyMove(newState, move.from, move.to);
  }

  return newState;
}

/**
 * Get performance summary
 */
export function getPerformanceSummary(state: GameState) {
  const par = state.puzzle.par;

  return {
    swaps: state.swapsUsed,
    energy: state.energyUsed,
    parSwaps: par.swaps,
    parEnergy: par.energy,
    swapsDelta: state.swapsUsed - par.swaps,
    energyDelta: state.energyUsed - par.energy,
    isUnderParSwaps: state.swapsUsed <= par.swaps,
    isUnderParEnergy: state.energyUsed <= par.energy,
    isPerfect: state.swapsUsed === par.swaps && state.energyUsed === par.energy,
  };
}

/**
 * Calculate optimal score (if player beats par)
 */
export function calculateScore(state: GameState): number {
  const summary = getPerformanceSummary(state);

  // Score: 100 base points
  // - Deduct points for swaps over par
  // - Deduct points for energy over par
  // + Bonus points for under par

  let score = 100;

  if (summary.swapsDelta > 0) {
    score -= summary.swapsDelta * 5; // -5 points per swap over par
  } else {
    score += Math.abs(summary.swapsDelta) * 10; // +10 points per swap under par
  }

  if (summary.energyDelta > 0) {
    score -= Math.floor(summary.energyDelta / 5); // -1 point per 5 energy over par
  } else {
    score += Math.floor(Math.abs(summary.energyDelta) / 5) * 2; // +2 points per 5 energy under par
  }

  // Perfect score bonus
  if (summary.isPerfect) {
    score += 50;
  }

  return Math.max(0, score); // Never negative
}

/**
 * Check if current attempt is a new best
 */
export function isNewBest(
  state: GameState,
  previousBestSwaps?: number,
  previousBestEnergy?: number
): { swaps: boolean; energy: boolean } {
  return {
    swaps: previousBestSwaps === undefined || state.swapsUsed < previousBestSwaps,
    energy: previousBestEnergy === undefined || state.energyUsed < previousBestEnergy,
  };
}

/**
 * Get time taken (in seconds)
 */
export function getTimeTaken(state: GameState): number {
  if (state.moveHistory.length === 0) {
    return 0;
  }

  const firstMove = state.moveHistory[0].timestamp;
  const lastMove = state.moveHistory[state.moveHistory.length - 1].timestamp;

  return Math.floor((lastMove - firstMove) / 1000);
}

/**
 * Replay all moves to verify game state
 * Useful for debugging and validation
 */
export function replayMoves(puzzle: PuzzleDefinition, moves: Move[]): GameState {
  let state = initGame(puzzle);

  for (const move of moves) {
    state = applyMove(state, move.from, move.to);
  }

  return state;
}
