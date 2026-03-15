import { ChallengeCategory } from '@/types/challenge';

export const API_PATHS = {
  CHALLENGES: '/api/challenges',
  CHALLENGES_STATS: '/api/challenges/stats',
} as const;

export const CATEGORY_LABEL: Record<ChallengeCategory, string> = {
  HEALTH: '健康',
  MONEY: 'お金',
  TIME: '時間',
  HABIT: '習慣',
  DIGITAL: 'デジタル',
};

export const CATEGORY_OPTIONS = [
  { value: 'HEALTH' as const, label: '健康' },
  { value: 'MONEY' as const, label: 'お金' },
  { value: 'TIME' as const, label: '時間' },
  { value: 'HABIT' as const, label: '習慣' },
  { value: 'DIGITAL' as const, label: 'デジタル' },
];
