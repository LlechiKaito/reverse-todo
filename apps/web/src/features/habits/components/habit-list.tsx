import { HabitItem, type HabitStatus } from './habit-item';

export interface Habit {
  id: string;
  title: string;
  category: string;
  status: HabitStatus;
  streakDays?: number;
}

interface HabitListProps {
  habits: Habit[];
  totalCount: number;
}

export function HabitList({ habits, totalCount }: HabitListProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Section header */}
      <div className="flex items-center justify-between w-full mb-4">
        <h2 className="font-fraunces text-lg font-semibold text-[var(--color-text-primary)] tracking-tight">
          すべての挑戦
        </h2>
        <span className="text-[var(--color-text-secondary)] text-sm">{totalCount}件</span>
      </div>

      {/* List */}
      <div className="flex flex-col bg-[var(--color-bg-card)] rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.25)] w-full">
        {habits.map((habit, index) => (
          <div key={habit.id}>
            <HabitItem
              title={habit.title}
              category={habit.category}
              status={habit.status}
              streakDays={habit.streakDays}
            />
            {index < habits.length - 1 && (
              <div className="h-px bg-[var(--color-border)] w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
