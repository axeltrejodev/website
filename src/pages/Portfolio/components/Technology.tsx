import { CSSProperties } from "react";

const Colors: { [key: string]: string } = {
  HTML: "#f16524",
  CSS: "#2965f0",
  JavaScript: "#f7e018",
  TypeScript: "#2d79c7",
  React: "#61dbfb",
};

type Props = {
  name: string;
  color?: string;
};

function Technology({ name, color }: Props) {
  if (!color && name in Colors) {
    color = Colors[name];
  } else {
    color = "#fff";
  }
  return (
    <li translate="no" style={{ "--disc-color": color } as CSSProperties}>
      {name}
    </li>
  );
}

export default Technology;
