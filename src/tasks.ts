
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = [];
let nextId = 1;

export function createTask(title: string): Task {
  const task: Task = {
    id: nextId++,
    title,
    completed: false,
  };

  tasks.push(task);
  return { ...task };
}

export function getTasks(): Task[] {
  return tasks.map((task) => ({ ...task }));
}

export function resetTasks(): void {
  tasks.length = 0;
  nextId = 1;
}
