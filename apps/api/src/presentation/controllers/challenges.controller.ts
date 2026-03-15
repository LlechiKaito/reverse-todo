import { Controller, Get, Post, Body } from '@nestjs/common';

import { ChallengesService } from '@/application/services/challenges.service';
import { CreateChallengeDto } from '@/presentation/dto/CreateChallengeDto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  async findAll() {
    return this.challengesService.findAll();
  }

  @Get('stats')
  async getStats() {
    return this.challengesService.getStats();
  }

  @Post()
  async create(@Body() dto: CreateChallengeDto) {
    return this.challengesService.create(
      dto.title,
      dto.reason ?? null,
      dto.category,
    );
  }
}
