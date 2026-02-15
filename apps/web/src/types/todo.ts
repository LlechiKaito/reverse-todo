export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
  dueDate: string | null;
  user: { id: string; name: string; email: string };
  tags: { id: string; name: string }[];
  createdAt: string;
};
