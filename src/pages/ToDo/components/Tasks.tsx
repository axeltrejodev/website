import Task from "./Task";
import useToDo from "../hooks/useToDo";

function Tasks() {
  const { tasks } = useToDo();
  return tasks.length > 0 ? (
    <section className="to-do-tasks">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  ) : (
    <p>No tasks to show.</p>
  );
}

export default Tasks;
