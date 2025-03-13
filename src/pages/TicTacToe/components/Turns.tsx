import Turn from "./Turn";
import useGame from "../hooks/useGame";
import { Turns as TurnsEnum } from "../constants";

function Turns() {
  const { turn } = useGame();
  return (
    <section className="tic-tac-toe-turns">
      <Turn selected={turn == TurnsEnum.X}>{TurnsEnum.X}</Turn>
      <Turn selected={turn == TurnsEnum.O}>{TurnsEnum.O}</Turn>
    </section>
  );
}

export default Turns;
