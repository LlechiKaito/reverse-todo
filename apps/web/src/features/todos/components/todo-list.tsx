import { Todo } from '@/types/todo';

import { TodoItem } from './todo-item';

type Props = {
  todos: Todo[];
};

export function TodoList({ todos }: Props) {
  if (todos.length === 0) {
    return <p className="text-gray-500">Todo がありません。</p>;
  }

  return (
    <ul className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
