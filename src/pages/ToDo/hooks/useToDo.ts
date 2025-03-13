import { useContext } from "react";
import ToDoContext from "../contexts/ToDo";

function useToDo() {
  const context = useContext(ToDoContext);
  if (context === undefined) {
    throw new Error("useToDo must be used within a ToDoProvider");
  }
  return context;
}

export default useToDo;
