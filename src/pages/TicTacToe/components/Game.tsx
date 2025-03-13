import Board from "./Board";
import Turns from "./Turns";
import Modal from "./Modal";
import useGame from "../hooks/useGame";

function Game() {
  const { resetGame } = useGame();
  return (
    <>
      <button onClick={resetGame}>Reset</button>
      <Board />
      <Turns />
      <Modal />
    </>
  );
}

export default Game;
