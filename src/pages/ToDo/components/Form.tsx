import { ChangeEvent, FormEvent, useState } from "react";
import useToDo from "../hooks/useToDo";

function Form() {
  const [name, setName] = useState("");
  const { addTask } = useToDo();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addTask(name);
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newName = e.currentTarget.value;
    setName(newName);
  }
  return (
    <form className="to-do-form" onSubmit={handleSubmit}>
      <input
        type="text"
        required
        value={name}
        placeholder="Type something..."
        onChange={handleChange}
      />
      <button>
        <i className="ri-add-line" />
      </button>
    </form>
  );
}

export default Form;
