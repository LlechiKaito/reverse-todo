import { TodoForm } from '@/features/todos/components/todo-form';
import { TodoList } from '@/features/todos/components/todo-list';
import { getTodos } from '@/features/todos/services/todo.service';

export async function TodoListContainer() {
  const todos = await getTodos();

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </main>
  );
}
