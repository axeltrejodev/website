import { createContext, ReactNode, useState } from "react";
import { type Task } from "../types";
import formatDate from "../utils/formatDate";

const mockTasks: Task[] = [
  {
    id: "1",
    name: "Task 1",
    date: "2025-05-20 5:00 PM.",
    completed: false,
  },
  {
    id: "2",
    name: "Task 2",
    date: "2025-05-20 5:00 PM.",
    completed: false,
  },
  {
    id: "3",
    name: "Task 3",
    date: "2025-05-20 5:00 PM.",
    completed: false,
  },
];

export type ToDoContextType = {
  tasks: Task[];
  addTask: (name: string) => void;
  toggleTask: (id: string) => void;
  updateTask: (id: string, newName: string) => void;
  removeTask: (id: string) => void;
};

const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

export default ToDoContext;

type Props = {
  children: ReactNode;
};

export function ToDoProvider({ children }: Props) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const tasksFromStorage = window.localStorage.getItem("to-do-tasks");
    if (tasksFromStorage) return JSON.parse(tasksFromStorage);
    return mockTasks;
  });
  function saveTasks(tasksToSave: Task[]) {
    window.localStorage.setItem("to-do-tasks", JSON.stringify(tasksToSave));
  }
  function addTask(name: string) {
    const newTasks = [
      ...tasks,
      {
        id: crypto.randomUUID(),
        name: name,
        date: formatDate(),
        completed: false,
      },
    ];
    setTasks(newTasks);
    saveTasks(newTasks);
  }
  function toggleTask(id: string) {
    const newTasks = tasks.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          completed: !task.completed,
        };
      }
      return task;
    });
    setTasks(newTasks);
    saveTasks(newTasks);
  }
  function updateTask(id: string, newName: string) {
    const newTasks = tasks.map((task) => {
      if (task.id == id) {
        return {
          ...task,
          name: newName,
        };
      }
      return task;
    });
    setTasks(newTasks);
    saveTasks(newTasks);
  }
  function removeTask(id: string) {
    const newTasks = tasks.filter((task) => task.id != id);
    setTasks(newTasks);
    saveTasks(newTasks);
  }
  return (
    <ToDoContext.Provider
      value={{
        tasks,
        addTask,
        toggleTask,
        updateTask,
        removeTask,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
}
