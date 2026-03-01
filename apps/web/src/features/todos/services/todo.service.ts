import { apiClient } from '@/lib/axios';
import { Todo } from '@/types/todo';

export async function getTodos(): Promise<Todo[]> {
  const { data } = await apiClient.get<Todo[]>('/api/todos');
  return data;
}

export async function createTodo(title: string, description?: string): Promise<Todo> {
  const { data } = await apiClient.post<Todo>('/api/todos', { title, description });
  return data;
}
