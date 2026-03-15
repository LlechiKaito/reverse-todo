export const STREAK_THRESHOLDS = {
  LONG: 7,
  MEDIUM: 3,
  WARNING: 1,
} as const;

export const STREAK_MESSAGES = {
  LONG: '続いてるよ。このまま。',
  MEDIUM: '良い調子！続けよう。',
  SHORT: 'まずは3日を目指そう！',
} as const;

export const DISPLAY_STATUS = {
  ACTIVE: 'active',
  WARNING: 'warning',
  COMPLETED: 'completed',
} as const;

export type DisplayStatus = (typeof DISPLAY_STATUS)[keyof typeof DISPLAY_STATUS];
