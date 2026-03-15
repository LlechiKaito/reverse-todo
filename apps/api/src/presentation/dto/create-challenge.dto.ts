import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ChallengeCategory } from '@/domain/entities/challenge.entity';

const CHALLENGE_CATEGORIES: ChallengeCategory[] = [
  'HEALTH',
  'MONEY',
  'TIME',
  'HABIT',
  'DIGITAL',
];

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsEnum(CHALLENGE_CATEGORIES)
  category!: ChallengeCategory;
}
