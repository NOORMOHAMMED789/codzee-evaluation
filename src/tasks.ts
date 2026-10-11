
export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const tasks: Task[] = Array.from({ length: 25 }, (_, index) => ({
  id: index + 1,
  title: `Task ${index + 1}`,
  completed: false,
}));

export function getTasksPage(limit: number, offset: number): {
  items: Task[];
  total: number;
  limit: number;
  offset: number;
} {
  return {
    items: tasks.slice(offset, offset + limit),
    total: tasks.length,
    limit,
    offset,
  };
}
