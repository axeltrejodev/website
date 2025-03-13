import { createContext, ReactNode, useState } from "react";
import confetti from "canvas-confetti";
import { type Board, type Winner } from "../types";
import { Turns, WinnerCombos } from "../constants";

export type GameContextType = {
  board: Board;
  turn: string;
  winner: Winner;
  resetGame: () => void;
  updateBoard: (index: number) => void;
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export default GameContext;

type Props = {
  children: ReactNode;
};

export function GameProvider({ children }: Props) {
  const [board, setBoard] = useState<Board>(() => {
    const boardFromStorage = window.localStorage.getItem("tic-tac-toe-board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("tic-tac-toe-turn");
    if (turnFromStorage) return turnFromStorage;
    return Turns.X;
  });
  const [winner, setWinner] = useState<Winner>(null);
  function saveGame(boardToSave: Board, turnToSave: string) {
    window.localStorage.setItem(
      "tic-tac-toe-board",
      JSON.stringify(boardToSave)
    );
    window.localStorage.setItem("tic-tac-toe-turn", turnToSave);
  }
  function resetGame() {
    const newBoard = Array(9).fill(null);
    const newTurn = Turns.X;
    setBoard(newBoard);
    setTurn(newTurn);
    setWinner(null);
    saveGame(newBoard, newTurn);
  }
  function checkWinner(boardToCheck: Board) {
    for (const combo of WinnerCombos) {
      const [a, b, c] = combo;
      const player = boardToCheck[a];
      if (
        typeof player == "string" &&
        boardToCheck[b] == player &&
        boardToCheck[c] == player
      ) {
        return player;
      }
    }
    return null;
  }
  function updateBoard(index: number) {
    if (board[index]) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn == Turns.X ? Turns.O : Turns.X;
    setTurn(newTurn);
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (newBoard.every((item) => item != null)) {
      setWinner(false);
    }
    saveGame(newBoard, newTurn);
  }
  return (
    <GameContext.Provider
      value={{
        board,
        turn,
        winner,
        resetGame,
        updateBoard,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
