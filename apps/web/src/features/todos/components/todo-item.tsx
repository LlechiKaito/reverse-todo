import { Todo } from '@/types/todo';

import { STATUS_COLOR, STATUS_LABEL } from '../constants';

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
        <p className="text-sm text-gray-600 mb-2">{todo.description}</p>
      )}

      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>担当: {todo.user.name}</span>
        {todo.dueDate && (
          <span>期限: {new Date(todo.dueDate).toLocaleDateString('ja-JP')}</span>
        )}
      </div>

      {todo.tags.length > 0 && (
        <div className="flex gap-1 mt-2">
          {todo.tags.map((tag) => (
            <span
              key={tag.id}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
    </li>
  );
}
