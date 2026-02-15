import { Inject, Injectable } from '@nestjs/common';

import { Todo } from '@/domain/entities/todo.entity';
import { TODO_REPOSITORY, TodoRepository } from '@/domain/repositories/todo.repository';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODO_REPOSITORY)
    private readonly todoRepository: TodoRepository,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll();
  }
}
