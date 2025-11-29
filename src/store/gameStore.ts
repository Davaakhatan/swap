/**
 * Game Store - Zustand state management for game
 * Manages game state, moves, and interactions
 */

import { create } from 'zustand';
import { initGame, applyMove, resetGame } from '../domain/game';
import { loadPuzzle } from '../data/puzzleLoader';
import type { GameState, Position, PuzzleDefinition } from '../domain/types';

interface GameStore {
  // State
  gameState: GameState | null;
  selectedPosition: Position | null;
  currentPuzzleId: string | null;

  // Actions
  startPuzzle: (puzzleId: string) => void;
  selectCell: (position: Position) => void;
  reset: () => void;
  clearSelection: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  gameState: null,
  selectedPosition: null,
  currentPuzzleId: null,

  // Start a new puzzle
  startPuzzle: (puzzleId: string) => {
    try {
      const puzzle = loadPuzzle(puzzleId);
      const gameState = initGame(puzzle);
      set({
        gameState,
        selectedPosition: null,
        currentPuzzleId: puzzleId,
      });
    } catch (error) {
      console.error('Failed to load puzzle:', error);
    }
  },

  // Handle cell selection and swaps
  selectCell: (position: Position) => {
    const { gameState, selectedPosition } = get();

    if (!gameState) return;

    // If no cell selected, select this one
    if (!selectedPosition) {
      set({ selectedPosition: position });
      return;
    }

    // If same cell clicked, deselect
    if (
      selectedPosition.row === position.row &&
      selectedPosition.col === position.col
    ) {
      set({ selectedPosition: null });
      return;
    }

    // Try to perform swap
    try {
      const newGameState = applyMove(gameState, selectedPosition, position);
      set({
        gameState: newGameState,
        selectedPosition: null,
      });
    } catch (error) {
      // Invalid swap - just change selection
      set({ selectedPosition: position });
    }
  },

  // Reset current puzzle
  reset: () => {
    const { gameState } = get();
    if (gameState) {
      const newGameState = resetGame(gameState);
      set({
        gameState: newGameState,
        selectedPosition: null,
      });
    }
  },

  // Clear selection
  clearSelection: () => {
    set({ selectedPosition: null });
  },
}));
