import Square from "./Square";
import useGame from "../hooks/useGame";

function Board() {
  const { board } = useGame();
  return (
    <section className="tic-tac-toe-board">
      {board.map((value, index) => (
        <Square key={index} index={index}>
          {value}
        </Square>
      ))}
    </section>
  );
}

export default Board;
