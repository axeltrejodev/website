import { useEffect } from "react";
import Form from "./components/Form";
import Tasks from "./components/Tasks";
import { ToDoProvider } from "./contexts/ToDo";
import "./index.css";

function ToDo() {
  useEffect(() => {
    document.title = "Axel Trejo - ToDo List";
  }, []);
  return (
    <>
      <h1>ToDo List</h1>
      <ToDoProvider>
        <Form />
        <Tasks />
      </ToDoProvider>
    </>
  );
}

export default ToDo;
