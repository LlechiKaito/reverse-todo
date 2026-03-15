'use client';

import { Check, X } from 'lucide-react';

export type HabitStatus = 'active' | 'warning' | 'completed';

interface HabitItemProps {
  title: string;
  category: string;
  status: HabitStatus;
  streakDays?: number;
  showActions?: boolean;
}

function getStatusColor(status: HabitStatus): string {
  switch (status) {
    case 'active':
      return 'var(--color-success)';
    case 'warning':
      return 'var(--color-warning)';
    case 'completed':
      return 'transparent';
  }
}

export function HabitItem({ title, category, status, streakDays, showActions = true }: HabitItemProps) {
  const dotColor = getStatusColor(status);
  const isCompleted = status === 'completed';

  return (
    <div className="flex items-center gap-3.5 px-5 py-4 w-full">
      {/* Status dot */}
      {isCompleted ? (
        <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#3A3A40]" />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dotColor }} />
      )}

      {/* Title & category */}
      <div className="flex flex-col gap-0.5 flex-1">
        <span
          className={`text-[15px] font-semibold ${isCompleted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'}`}
        >
          {title}
        </span>
        <span
          className={`text-[13px] font-medium ${isCompleted ? 'text-[var(--color-text-muted)]' : 'text-[var(--color-text-secondary)]'}`}
        >
          {category}
        </span>
      </div>

      {/* Actions or completion badge */}
      {showActions && !isCompleted && (
        <div className="flex items-center gap-2.5">
          <button className="flex items-center gap-1.5 bg-[#32D583]/15 text-[#32D583] rounded-xl px-4 py-2.5 text-[13px] font-semibold hover:bg-[#32D583]/25 transition">
            <Check size={14} />
            <span>今日もOK</span>
          </button>
          <button className="flex items-center gap-1.5 bg-[#F87171]/10 text-[#F87171] rounded-xl px-4 py-2.5 text-[13px] font-semibold hover:bg-[#F87171]/20 transition">
            <X size={14} />
            <span>今日は敗北…</span>
          </button>
        </div>
      )}

      {/* Streak days */}
      {streakDays !== undefined && !isCompleted && (
        <span
          className="text-[17px] font-bold"
          style={{ color: status === 'warning' ? 'var(--color-warning)' : 'var(--color-success)' }}
        >
          継続日数：{streakDays}日
        </span>
      )}

      {/* Completed badge */}
      {isCompleted && (
        <div className="bg-[rgba(50,213,131,0.13)] rounded-lg px-2.5 py-1">
          <span className="text-[var(--color-success)] text-xs font-semibold">達成</span>
        </div>
      )}
    </div>
  );
}
