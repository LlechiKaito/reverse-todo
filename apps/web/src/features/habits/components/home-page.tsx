'use client';

import { CATEGORY_LABEL } from '@/features/habits/constants';
import {
  useChallenges,
  useChallengeStats,
} from '@/features/habits/hooks/use-challenges';

import { Header } from './header';
import { StatCard } from './stat-card';
import { FeaturedCard } from './featured-card';
import { HabitList } from './habit-list';

function getFormattedDate(): string {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekDays = ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'];
  const weekDay = weekDays[now.getDay()];
  return `${month}月${day}日 ${weekDay}`;
}

export function HomePage() {
  const { challenges, loading: challengesLoading } = useChallenges();
  const { stats, loading: statsLoading } = useChallengeStats();

  if (challengesLoading || statsLoading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <span className="text-[var(--color-text-secondary)]">読み込み中...</span>
      </main>
    );
  }

  const habits = challenges.map((c) => ({
    id: c.id,
    title: c.title,
    category: CATEGORY_LABEL[c.category],
    status: c.status,
    streakDays: c.streakDays,
  }));

  return (
    <main className="flex-1 flex flex-col gap-7 overflow-y-auto px-11 py-9">
      <Header date={getFormattedDate()} title="やめたいこと" />

      <div className="flex gap-3 w-full">
        <StatCard label="挑戦中" value={String(stats?.activeCount ?? 0)} />
        <StatCard
          label="最長ストリーク"
          value={`${stats?.maxStreak ?? 0}日`}
          valueColor="var(--color-success)"
        />
        <StatCard label="達成済み" value={String(stats?.completedCount ?? 0)} />
      </div>

      {stats?.featured && (
        <FeaturedCard
          category={CATEGORY_LABEL[stats.featured.category]}
          title={stats.featured.title}
          message={stats.featured.message}
          streakDays={stats.featured.streakDays}
        />
      )}

      <HabitList habits={habits} totalCount={habits.length} />
    </main>
  );
}
