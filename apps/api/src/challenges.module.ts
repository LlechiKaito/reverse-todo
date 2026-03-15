import { Module } from '@nestjs/common';

import { ChallengesService } from '@/application/services/challenges.service';
import { CHALLENGE_REPOSITORY } from '@/domain/repositories/challenge.repository';
import { PrismaChallengeRepository } from '@/infrastructure/repositories/prisma-challenge.repository';
import { ChallengesController } from '@/presentation/controllers/challenges.controller';

@Module({
  controllers: [ChallengesController],
  providers: [
    ChallengesService,
    {
      provide: CHALLENGE_REPOSITORY,
      useClass: PrismaChallengeRepository,
    },
  ],
})
export class ChallengesModule {}
