import { Todo } from '@/types/todo';

import { STATUS_COLOR, STATUS_LABEL } from '@/features/todos/constants';

type Props = {
  todo: Todo;
};

export function TodoItem({ todo }: Props) {
  return (
    <li className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold">{todo.title}</h2>
        <span
          className={`text-xs font-medium px-2 py-1 rounded ${STATUS_COLOR[todo.status]}`}
        >
          {STATUS_LABEL[todo.status]}
        </span>
      </div>

      {todo.description && (
        <p className="text-sm text-gray-600">{todo.description}</p>
      )}
    </li>
  );
}
