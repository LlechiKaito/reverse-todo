import { TodoStatus } from '@/types/todo';

export const STATUS_LABEL: Record<TodoStatus, string> = {
  PENDING: '未着手',
  IN_PROGRESS: '進行中',
  COMPLETED: '完了',
};

export const STATUS_COLOR: Record<TodoStatus, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  IN_PROGRESS: 'bg-blue-100 text-blue-800',
  COMPLETED: 'bg-green-100 text-green-800',
};
