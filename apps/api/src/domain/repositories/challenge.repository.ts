import { Challenge, ChallengeCategory } from '@/domain/entities/challenge.entity';
import { DailyLog } from '@/domain/entities/daily-log.entity';

export const CHALLENGE_REPOSITORY = Symbol('CHALLENGE_REPOSITORY');

export interface ChallengeRepository {
  findAll(): Promise<(Challenge & { dailyLogs: DailyLog[] })[]>;
  create(data: {
    title: string;
    reason: string | null;
    category: ChallengeCategory;
  }): Promise<Challenge>;
}
