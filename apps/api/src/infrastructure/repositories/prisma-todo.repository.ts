import { Injectable } from '@nestjs/common';

import { Tag } from '@/domain/entities/tag.entity';
import { Todo } from '@/domain/entities/todo.entity';
import { User } from '@/domain/entities/user.entity';
import { TodoRepository } from '@/domain/repositories/todo.repository';
import { PrismaService } from '@/infrastructure/database/prisma.service';

@Injectable()
export class PrismaTodoRepository implements TodoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Todo[]> {
    const records = await this.prisma.todo.findMany({
      include: {
        user: { select: { id: true, name: true, email: true } },
        tags: { include: { tag: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return records.map(
      (r) =>
        new Todo(
          r.id,
          r.title,
          r.description,
          r.status,
          r.dueDate,
          new User(r.user.id, r.user.name, r.user.email),
          r.tags.map((t) => new Tag(t.tag.id, t.tag.name)),
          r.createdAt,
          r.updatedAt,
        ),
    );
  }
}
