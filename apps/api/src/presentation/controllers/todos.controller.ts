import { Controller, Get, Post, Body } from '@nestjs/common';

import { TodosService } from '@/application/services/todos.service';
import { CreateTodoDto } from '../dto/CreateTodoDto';
import { HttpStatus } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async findAll() {
    return this.todosService.findAll();
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto.title, createTodoDto.description);
  }
}
