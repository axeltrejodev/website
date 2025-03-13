import { useState } from "react";
import useToDo from "../hooks/useToDo";
import { type Task as TaskType } from "../types";

type Props = {
  task: TaskType;
};

function Task({ task }: Props) {
  const [name, setName] = useState(task.name);
  const { toggleTask, updateTask, removeTask } = useToDo();
  return (
    <div
      className={`task ${task.completed && "completed"}`}
      onClick={() => toggleTask(task.id)}
    >
      <div className="details">
        <h2
          contentEditable
          suppressContentEditableWarning
          translate="no"
          spellCheck={false}
          onInput={(e) => setName(e.currentTarget.textContent!)}
        >
          {task.name}
        </h2>
        <span>{task.date}</span>
      </div>
      <div className="actions">
        <button
          disabled={name == task.name}
          onClick={(e) => {
            e.stopPropagation();
            updateTask(task.id, name);
          }}
        >
          <i className="ri-save-line" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeTask(task.id);
          }}
        >
          <i className="ri-delete-bin-line" />
        </button>
      </div>
    </div>
  );
}

export default Task;
