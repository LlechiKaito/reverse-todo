'use client';

import { Header } from './header';
import { StatCard } from './stat-card';
import { FeaturedCard } from './featured-card';
import { HabitList, type Habit } from './habit-list';

const mockHabits: Habit[] = [
  {
    id: '1',
    title: '無駄な会議に出席する',
    category: '仕事',
    status: 'active',
    streakDays: 7,
  },
  {
    id: '2',
    title: '完璧主義で悩む',
    category: '思考',
    status: 'active',
    streakDays: 3,
  },
  {
    id: '3',
    title: '夜更かしする',
    category: '習慣',
    status: 'warning',
    streakDays: 1,
  },
  {
    id: '4',
    title: '他人と比較する',
    category: '人間関係',
    status: 'completed',
  },
];

function getFormattedDate(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const weekDay = weekDays[now.getDay()];
  return `${month}月${day}日 ${weekDay}`;
}

export function HomePage() {
  return (
    <main className="flex-1 flex flex-col gap-7 overflow-y-auto px-11 py-9">
      <Header date={getFormattedDate()} title="やめたいこと" />

      <div className="flex gap-3 w-full">
        <StatCard label="挑戦中" value="4" />
        <StatCard label="最長ストリーク" value="14日" valueColor="var(--color-success)" />
        <StatCard label="達成済み" value="12" />
      </div>

      <FeaturedCard
        category="デジタル"
        title="寝る前にSNSを見る"
        message="続いてるよ。このまま。"
        streakDays={14}
      />

      <HabitList habits={mockHabits} totalCount={4} />
    </main>
  );
}
