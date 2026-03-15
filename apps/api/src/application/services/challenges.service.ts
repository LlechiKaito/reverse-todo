import { Inject, Injectable } from '@nestjs/common';

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
      const displayStatus = c.status === 'COMPLETED'
        ? 'completed'
        : streak <= 1
          ? 'warning'
          : 'active';

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
    const completedCount = enriched.filter((c) => c.status === 'COMPLETED').length;
    const maxStreak = enriched.length > 0
      ? Math.max(...enriched.map((c) => c.streak))
      : 0;

    // Featured: the active challenge with the longest streak
    const featured = activeChallenges
      .sort((a, b) => b.streak - a.streak)[0] ?? null;

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
            message: featured.streak >= 7
              ? '続いてるよ。このまま。'
              : featured.streak >= 3
                ? '良い調子！続けよう。'
                : 'まずは3日を目指そう！',
          }
        : null,
    };
  }

  async create(title: string, reason: string | null, category: ChallengeCategory) {
    return this.challengeRepository.create({ title, reason, category });
  }

  private calculateStreak(dailyLogs: DailyLog[]): number {
    if (dailyLogs.length === 0) return 0;

    // dailyLogs are sorted desc by date
    const successLogs = dailyLogs.filter((l) => l.success);
    if (successLogs.length === 0) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if the most recent success is today or yesterday
    const mostRecentDate = new Date(successLogs[0].date);
    mostRecentDate.setHours(0, 0, 0, 0);

    if (mostRecentDate.getTime() !== today.getTime() &&
        mostRecentDate.getTime() !== yesterday.getTime()) {
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
