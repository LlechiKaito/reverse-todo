import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ChallengesModule } from '@/challenges.module';
import { PrismaModule } from '@/infrastructure/database/prisma.module';
import { TodosModule } from '@/todos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    TodosModule,
    ChallengesModule,
  ],
})
export class AppModule {}
