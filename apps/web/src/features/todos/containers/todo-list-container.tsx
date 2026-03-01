import { getTodos } from '../services/todo.service';
import { TodoList } from '../components/todo-list';
import { TodoForm } from '../components/todo-form';

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
