import { Todo } from '@/domain/entities/todo.entity';

export const TODO_REPOSITORY = Symbol('TODO_REPOSITORY');

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  create(title: string, description: string | null): Promise<Todo>;
}
