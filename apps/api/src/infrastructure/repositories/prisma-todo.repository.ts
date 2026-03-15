import { Injectable } from '@nestjs/common';

import { Todo } from '@/domain/entities/todo.entity';
import { TodoRepository } from '@/domain/repositories/todo.repository';
import { PrismaService } from '@/infrastructure/database/prisma.service';
import { TodoStatus } from '@prisma/client';

@Injectable()
export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    const records = await this.prisma.todo.findMany();

    return records.map(
      (r) =>
        new Todo(
          r.id,
          r.title,
          r.description,
          r.status
        ),
    );
  }

  async create(title: string, description: string | null): Promise<Todo> {
    const record = await this.prisma.todo.create({
      data: { title, description, status: TodoStatus.PENDING },
    });

    return new Todo(record.id, record.title, record.description, record.status);
  }
}
