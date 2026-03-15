import { Injectable } from '@nestjs/common';
import {
  ChallengeCategory as PrismaChallengeCategory,
} from '@prisma/client';

import { Challenge } from '@/domain/entities/challenge.entity';
import { DailyLog } from '@/domain/entities/daily-log.entity';
import { ChallengeRepository } from '@/domain/repositories/challenge.repository';
import { PrismaService } from '@/infrastructure/database/prisma.service';

@Injectable()
export class PrismaChallengeRepository implements ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(Challenge & { dailyLogs: DailyLog[] })[]> {
    const records = await this.prisma.challenge.findMany({
      include: { dailyLogs: { orderBy: { date: 'desc' } } },
      orderBy: { createdAt: 'desc' },
    });

    return records.map((r) => ({
      ...new Challenge(r.id, r.title, r.reason, r.category, r.status, r.createdAt),
      dailyLogs: r.dailyLogs.map(
        (l) => new DailyLog(l.id, l.challengeId, l.date, l.success),
      ),
    }));
  }

  async create(data: {
    title: string;
    reason: string | null;
    category: PrismaChallengeCategory;
  }): Promise<Challenge> {
    const r = await this.prisma.challenge.create({ data });
    return new Challenge(r.id, r.title, r.reason, r.category, r.status, r.createdAt);
  }

}
