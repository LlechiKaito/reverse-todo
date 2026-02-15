import { Tag } from '@/domain/entities/tag.entity';
import { User } from '@/domain/entities/user.entity';

export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export class Todo {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly status: TodoStatus,
    public readonly dueDate: Date | null,
    public readonly user: User,
    public readonly tags: Tag[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
