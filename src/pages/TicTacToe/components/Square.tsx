import { ReactNode } from "react";
import useGame from "../hooks/useGame";

type Props = {
  children: ReactNode;
  index: number;
};

function Square({ children, index }: Props) {
  const { updateBoard } = useGame();
  return (
    <div onClick={() => updateBoard(index)} className="square">
      {children}
    </div>
  );
}

export default Square;
