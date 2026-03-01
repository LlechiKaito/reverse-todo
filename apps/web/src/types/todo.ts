export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export type Todo = {
  id: string;
  title: string;
  description: string | null;
  status: TodoStatus;
};
