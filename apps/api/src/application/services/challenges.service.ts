import { Inject, Injectable } from '@nestjs/common';

import {
  DISPLAY_STATUS,
  STREAK_MESSAGES,
  STREAK_THRESHOLDS,
} from '@/domain/constants/challenge.constants';
import { ChallengeCategory } from '@/domain/entities/challenge.entity';
import { DailyLog } from '@/domain/entities/daily-log.entity';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepository,
} from '@/domain/repositories/challenge.repository';

@Injectable()
export class ChallengesService {
  constructor(
    @Inject(CHALLENGE_REPOSITORY)
    private readonly challengeRepository: ChallengeRepository,
  ) {}

  async findAll() {
    const challenges = await this.challengeRepository.findAll();

    return challenges.map((c) => {
      const streak = this.calculateStreak(c.dailyLogs);
      const displayStatus =
        c.status === 'COMPLETED'
          ? DISPLAY_STATUS.COMPLETED
          : streak <= STREAK_THRESHOLDS.WARNING
            ? DISPLAY_STATUS.WARNING
            : DISPLAY_STATUS.ACTIVE;

      return {
        id: c.id,
        title: c.title,
        reason: c.reason,
        category: c.category,
        status: displayStatus,
        streakDays: streak,
        createdAt: c.createdAt,
      };
    });
  }

  async getStats() {
    const challenges = await this.challengeRepository.findAll();

    const enriched = challenges.map((c) => {
      const streak = this.calculateStreak(c.dailyLogs);
      return { ...c, streak };
    });

    const activeChallenges = enriched.filter((c) => c.status === 'ACTIVE');
    const completedCount = enriched.filter(
      (c) => c.status === 'COMPLETED',
    ).length;
    const maxStreak =
      enriched.length > 0
        ? Math.max(...enriched.map((c) => c.streak))
        : 0;

    const featured =
      activeChallenges.sort((a, b) => b.streak - a.streak)[0] ?? null;

    return {
      activeCount: activeChallenges.length,
      maxStreak,
      completedCount,
      featured: featured
        ? {
            id: featured.id,
            title: featured.title,
            category: featured.category,
            streakDays: featured.streak,
            message: this.getStreakMessage(featured.streak),
          }
        : null,
    };
  }

  async create(
    title: string,
    reason: string | null,
    category: ChallengeCategory,
  ) {
    return this.challengeRepository.create({ title, reason, category });
  }

  private getStreakMessage(streak: number): string {
    if (streak >= STREAK_THRESHOLDS.LONG) {
      return STREAK_MESSAGES.LONG;
    }
    if (streak >= STREAK_THRESHOLDS.MEDIUM) {
      return STREAK_MESSAGES.MEDIUM;
    }
    return STREAK_MESSAGES.SHORT;
  }

  calculateStreak(dailyLogs: DailyLog[]): number {
    if (dailyLogs.length === 0) return 0;

    const successLogs = dailyLogs.filter((l) => l.success);
    if (successLogs.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const mostRecentDate = new Date(successLogs[0].date);
    mostRecentDate.setHours(0, 0, 0, 0);

    if (
      mostRecentDate.getTime() !== today.getTime() &&
      mostRecentDate.getTime() !== yesterday.getTime()
    ) {
      return 0;
    }

    let streak = 1;
    let currentDate = new Date(mostRecentDate);

    for (let i = 1; i < successLogs.length; i++) {
      const logDate = new Date(successLogs[i].date);
      logDate.setHours(0, 0, 0, 0);

      const expectedPrev = new Date(currentDate);
      expectedPrev.setDate(expectedPrev.getDate() - 1);

      if (logDate.getTime() === expectedPrev.getTime()) {
        streak++;
        currentDate = logDate;
      } else {
        break;
      }
    }

    return streak;
  }
}
