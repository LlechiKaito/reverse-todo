import { Controller, Get } from '@nestjs/common';

import { TodosService } from '@/application/services/todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }
}
