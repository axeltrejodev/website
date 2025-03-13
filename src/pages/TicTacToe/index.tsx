import { useEffect } from "react";
import Game from "./components/Game";
import { GameProvider } from "./contexts/Game";
import "./index.css";

function TicTacToe() {
  useEffect(() => {
    document.title = "Axel Trejo - Tic Tac Toe";
  }, []);
  return (
    <>
      <h1>Tic Tac Toe</h1>
      <GameProvider>
        <Game />
      </GameProvider>
    </>
  );
}

export default TicTacToe;
