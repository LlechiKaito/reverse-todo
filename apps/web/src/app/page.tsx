import { TodoListContainer } from '@/features/todos/containers/todo-list-container';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return <TodoListContainer />;
}
