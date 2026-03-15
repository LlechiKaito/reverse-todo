import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChallengeDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  reason?: string;

  @IsEnum(['HEALTH', 'MONEY', 'TIME', 'HABIT', 'DIGITAL'])
  category!: 'HEALTH' | 'MONEY' | 'TIME' | 'HABIT' | 'DIGITAL';
}
