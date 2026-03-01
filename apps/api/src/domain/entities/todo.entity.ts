export type TodoStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';

export class Todo {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly status: TodoStatus,
  ) {}
}
