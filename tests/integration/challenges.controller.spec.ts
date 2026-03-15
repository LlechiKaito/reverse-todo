import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { CHALLENGE_REPOSITORY } from '@/domain/repositories/challenge.repository';
import { Challenge } from '@/domain/entities/challenge.entity';
import { DailyLog } from '@/domain/entities/daily-log.entity';
import { HttpExceptionFilter } from '@/presentation/filters/http-exception.filter';
import { ChallengesModule } from '@/challenges.module';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

describe('ChallengesController (Integration)', () => {
  let app: INestApplication;

  const mockRepository = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ChallengesModule],
    })
      .overrideProvider(CHALLENGE_REPOSITORY)
      .useValue(mockRepository)
      .compile();

    app = module.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/challenges', () => {
    it('should return challenges with streak and display status', async () => {
      const challenge = {
        ...new Challenge(
          'c1',
          'Test Challenge',
          null,
          'HEALTH',
          'ACTIVE',
          new Date(),
        ),
        dailyLogs: Array.from({ length: 5 }, (_, i) =>
          new DailyLog(`l${i}`, 'c1', daysAgo(i), true),
        ),
      };
      mockRepository.findAll.mockResolvedValue([challenge]);

      const response = await request(app.getHttpServer())
        .get('/api/challenges')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].streakDays).toBe(5);
      expect(response.body[0].status).toBe('active');
    });

    it('should return empty array when no challenges', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const response = await request(app.getHttpServer())
        .get('/api/challenges')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /api/challenges/stats', () => {
    it('should return stats with featured challenge', async () => {
      const challenge = {
        ...new Challenge(
          'c1',
          'Featured',
          null,
          'DIGITAL',
          'ACTIVE',
          new Date(),
        ),
        dailyLogs: Array.from({ length: 10 }, (_, i) =>
          new DailyLog(`l${i}`, 'c1', daysAgo(i), true),
        ),
      };
      mockRepository.findAll.mockResolvedValue([challenge]);

      const response = await request(app.getHttpServer())
        .get('/api/challenges/stats')
        .expect(200);

      expect(response.body.activeCount).toBe(1);
      expect(response.body.maxStreak).toBe(10);
      expect(response.body.featured).not.toBeNull();
      expect(response.body.featured.title).toBe('Featured');
    });
  });

  describe('POST /api/challenges', () => {
    it('should create a challenge with valid data', async () => {
      const created = new Challenge(
        'c1',
        'New Challenge',
        'Some reason',
        'HEALTH',
        'ACTIVE',
        new Date(),
      );
      mockRepository.create.mockResolvedValue(created);

      const response = await request(app.getHttpServer())
        .post('/api/challenges')
        .send({
          title: 'New Challenge',
          reason: 'Some reason',
          category: 'HEALTH',
        })
        .expect(201);

      expect(response.body.title).toBe('New Challenge');
    });

    it('should return 400 when title is missing', async () => {
      await request(app.getHttpServer())
        .post('/api/challenges')
        .send({ category: 'HEALTH' })
        .expect(400);
    });

    it('should return 400 when category is invalid', async () => {
      await request(app.getHttpServer())
        .post('/api/challenges')
        .send({ title: 'Test', category: 'INVALID' })
        .expect(400);
    });

    it('should accept challenge without reason', async () => {
      const created = new Challenge(
        'c1',
        'No Reason',
        null,
        'TIME',
        'ACTIVE',
        new Date(),
      );
      mockRepository.create.mockResolvedValue(created);

      const response = await request(app.getHttpServer())
        .post('/api/challenges')
        .send({ title: 'No Reason', category: 'TIME' })
        .expect(201);

      expect(response.body.title).toBe('No Reason');
    });
  });
});
