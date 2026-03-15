import { Todo } from '@/domain/entities/todo.entity';

export const TODO_REPOSITORY = Symbol('TODO_REPOSITORY');

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  delete(id: string): Promise<void>;
}
