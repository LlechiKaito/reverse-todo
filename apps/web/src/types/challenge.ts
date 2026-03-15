export type ChallengeCategory = 'HEALTH' | 'MONEY' | 'TIME' | 'HABIT' | 'DIGITAL';

export type DisplayStatus = 'active' | 'warning' | 'completed';

export type Challenge = {
  id: string;
  title: string;
  reason: string | null;
  category: ChallengeCategory;
  status: DisplayStatus;
  streakDays: number;
  createdAt: string;
};

export type ChallengeStats = {
  activeCount: number;
  maxStreak: number;
  completedCount: number;
  featured: {
    id: string;
    title: string;
    category: ChallengeCategory;
    streakDays: number;
    message: string;
  } | null;
};
