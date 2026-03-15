import { Test, TestingModule } from '@nestjs/testing';

import { ChallengesService } from '@/application/services/challenges.service';
import {
  DISPLAY_STATUS,
  STREAK_MESSAGES,
} from '@/domain/constants/challenge.constants';
import { Challenge } from '@/domain/entities/challenge.entity';
import { DailyLog } from '@/domain/entities/daily-log.entity';
import {
  CHALLENGE_REPOSITORY,
  ChallengeRepository,
} from '@/domain/repositories/challenge.repository';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function createDailyLog(
  challengeId: string,
  daysBack: number,
  success: boolean,
): DailyLog {
  return new DailyLog(
    `log-${daysBack}`,
    challengeId,
    daysAgo(daysBack),
    success,
  );
}

function createChallenge(
  overrides: Partial<Challenge> = {},
): Challenge & { dailyLogs: DailyLog[] } {
  return {
    id: overrides.id ?? 'challenge-1',
    title: overrides.title ?? 'Test Challenge',
    reason: overrides.reason ?? null,
    category: overrides.category ?? 'HEALTH',
    status: overrides.status ?? 'ACTIVE',
    createdAt: overrides.createdAt ?? new Date(),
    dailyLogs: [],
  };
}

describe('ChallengesService', () => {
  let service: ChallengesService;
  let repository: jest.Mocked<ChallengeRepository>;

  beforeEach(async () => {
    const mockRepository: jest.Mocked<ChallengeRepository> = {
      findAll: jest.fn(),
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChallengesService,
        { provide: CHALLENGE_REPOSITORY, useValue: mockRepository },
      ],
    }).compile();

    service = module.get<ChallengesService>(ChallengesService);
    repository = mockRepository;
  });

  describe('calculateStreak', () => {
    it('should return 0 for empty daily logs', () => {
      expect(service.calculateStreak([])).toBe(0);
    });

    it('should return 0 when all logs are failures', () => {
      const logs = [
        createDailyLog('c1', 0, false),
        createDailyLog('c1', 1, false),
      ];
      expect(service.calculateStreak(logs)).toBe(0);
    });

    it('should return 1 for a single success today', () => {
      const logs = [createDailyLog('c1', 0, true)];
      expect(service.calculateStreak(logs)).toBe(1);
    });

    it('should return 1 for a single success yesterday', () => {
      const logs = [createDailyLog('c1', 1, true)];
      expect(service.calculateStreak(logs)).toBe(1);
    });

    it('should return 0 when most recent success is 2+ days ago', () => {
      const logs = [createDailyLog('c1', 2, true)];
      expect(service.calculateStreak(logs)).toBe(0);
    });

    it('should count consecutive days correctly', () => {
      const logs = [
        createDailyLog('c1', 0, true),
        createDailyLog('c1', 1, true),
        createDailyLog('c1', 2, true),
      ];
      expect(service.calculateStreak(logs)).toBe(3);
    });

    it('should break streak on gap', () => {
      const logs = [
        createDailyLog('c1', 0, true),
        createDailyLog('c1', 1, true),
        createDailyLog('c1', 3, true),
      ];
      expect(service.calculateStreak(logs)).toBe(2);
    });

    it('should filter out failure logs and count only successes', () => {
      const logs = [
        createDailyLog('c1', 0, true),
        createDailyLog('c1', 1, false),
        createDailyLog('c1', 1, true),
      ];
      // successLogs = [day 0, day 1], consecutive
      expect(service.calculateStreak(logs)).toBe(2);
    });

    it('should handle 7-day streak', () => {
      const logs = Array.from({ length: 7 }, (_, i) =>
        createDailyLog('c1', i, true),
      );
      expect(service.calculateStreak(logs)).toBe(7);
    });

    it('should handle 14-day streak', () => {
      const logs = Array.from({ length: 14 }, (_, i) =>
        createDailyLog('c1', i, true),
      );
      expect(service.calculateStreak(logs)).toBe(14);
    });
  });

  describe('findAll', () => {
    it('should return challenges with calculated streak and display status', async () => {
      const challenge = createChallenge({ id: 'c1' });
      challenge.dailyLogs = [
        createDailyLog('c1', 0, true),
        createDailyLog('c1', 1, true),
        createDailyLog('c1', 2, true),
      ];
      repository.findAll.mockResolvedValue([challenge]);

      const result = await service.findAll();

      expect(result).toHaveLength(1);
      expect(result[0].streakDays).toBe(3);
      expect(result[0].status).toBe(DISPLAY_STATUS.ACTIVE);
    });

    it('should mark challenge as warning when streak <= 1', async () => {
      const challenge = createChallenge({ id: 'c1' });
      challenge.dailyLogs = [createDailyLog('c1', 0, true)];
      repository.findAll.mockResolvedValue([challenge]);

      const result = await service.findAll();

      expect(result[0].status).toBe(DISPLAY_STATUS.WARNING);
      expect(result[0].streakDays).toBe(1);
    });

    it('should mark completed challenge as completed regardless of streak', async () => {
      const challenge = createChallenge({ id: 'c1', status: 'COMPLETED' });
      challenge.dailyLogs = Array.from({ length: 10 }, (_, i) =>
        createDailyLog('c1', i, true),
      );
      repository.findAll.mockResolvedValue([challenge]);

      const result = await service.findAll();

      expect(result[0].status).toBe(DISPLAY_STATUS.COMPLETED);
    });
  });

  describe('getStats', () => {
    it('should return correct stats with featured challenge', async () => {
      const c1 = createChallenge({ id: 'c1', title: 'Challenge 1' });
      c1.dailyLogs = Array.from({ length: 7 }, (_, i) =>
        createDailyLog('c1', i, true),
      );

      const c2 = createChallenge({ id: 'c2', title: 'Challenge 2' });
      c2.dailyLogs = Array.from({ length: 3 }, (_, i) =>
        createDailyLog('c2', i, true),
      );

      const c3 = createChallenge({
        id: 'c3',
        title: 'Completed',
        status: 'COMPLETED',
      });
      c3.dailyLogs = [];

      repository.findAll.mockResolvedValue([c1, c2, c3]);

      const stats = await service.getStats();

      expect(stats.activeCount).toBe(2);
      expect(stats.completedCount).toBe(1);
      expect(stats.maxStreak).toBe(7);
      expect(stats.featured).not.toBeNull();
      expect(stats.featured?.id).toBe('c1');
      expect(stats.featured?.streakDays).toBe(7);
      expect(stats.featured?.message).toBe(STREAK_MESSAGES.LONG);
    });

    it('should return null featured when no active challenges', async () => {
      const c = createChallenge({ status: 'COMPLETED' });
      c.dailyLogs = [];
      repository.findAll.mockResolvedValue([c]);

      const stats = await service.getStats();

      expect(stats.featured).toBeNull();
      expect(stats.activeCount).toBe(0);
    });

    it('should return medium streak message for 3-6 day streak', async () => {
      const c = createChallenge({ id: 'c1' });
      c.dailyLogs = Array.from({ length: 5 }, (_, i) =>
        createDailyLog('c1', i, true),
      );
      repository.findAll.mockResolvedValue([c]);

      const stats = await service.getStats();

      expect(stats.featured?.message).toBe(STREAK_MESSAGES.MEDIUM);
    });

    it('should return short streak message for < 3 day streak', async () => {
      const c = createChallenge({ id: 'c1' });
      c.dailyLogs = Array.from({ length: 2 }, (_, i) =>
        createDailyLog('c1', i, true),
      );
      repository.findAll.mockResolvedValue([c]);

      const stats = await service.getStats();

      expect(stats.featured?.message).toBe(STREAK_MESSAGES.SHORT);
    });

    it('should handle empty challenges list', async () => {
      repository.findAll.mockResolvedValue([]);

      const stats = await service.getStats();

      expect(stats.activeCount).toBe(0);
      expect(stats.completedCount).toBe(0);
      expect(stats.maxStreak).toBe(0);
      expect(stats.featured).toBeNull();
    });
  });

  describe('create', () => {
    it('should delegate to repository', async () => {
      const expected = new Challenge(
        'c1',
        'Test',
        null,
        'HEALTH',
        'ACTIVE',
        new Date(),
      );
      repository.create.mockResolvedValue(expected);

      const result = await service.create('Test', null, 'HEALTH');

      expect(repository.create).toHaveBeenCalledWith({
        title: 'Test',
        reason: null,
        category: 'HEALTH',
      });
      expect(result).toEqual(expected);
    });
  });
});
