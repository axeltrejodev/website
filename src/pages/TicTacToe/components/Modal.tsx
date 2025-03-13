import Turn from "./Turn";
import useGame from "../hooks/useGame";

function Modal() {
  const { winner, resetGame } = useGame();
  if (winner == null) return null;
  return (
    <section className="tic-tac-toe-modal">
      <div className="content">
        <h2>{winner ? "Won:" : "Drew:"}</h2>
        <Turn selected>{winner ? winner : "="}</Turn>
        <button onClick={resetGame}>Play Again</button>
      </div>
    </section>
  );
}

export default Modal;
