import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  selected: boolean;
};

function Turn({ children, selected }: Props) {
  return (
    <div className={`tic-tac-toe-turn ${selected && "selected"}`}>
      {children}
    </div>
  );
}

export default Turn;
