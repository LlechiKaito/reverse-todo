import { Module } from '@nestjs/common';

import { TodosService } from '@/application/services/todos.service';
import { TODO_REPOSITORY } from '@/domain/repositories/todo.repository';
import { PrismaTodoRepository } from '@/infrastructure/repositories/prisma-todo.repository';
import { TodosController } from '@/presentation/controllers/todos.controller';

@Module({
  controllers: [TodosController],
  providers: [
    TodosService,
    {
      provide: TODO_REPOSITORY,
      useClass: PrismaTodoRepository,
    },
  ],
})
export class TodosModule {}
