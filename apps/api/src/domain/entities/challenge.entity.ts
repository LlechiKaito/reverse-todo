export type ChallengeCategory = 'HEALTH' | 'MONEY' | 'TIME' | 'HABIT' | 'DIGITAL';

export type ChallengeStatus = 'ACTIVE' | 'COMPLETED';

export class Challenge {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly reason: string | null,
    public readonly category: ChallengeCategory,
    public readonly status: ChallengeStatus,
    public readonly createdAt: Date,
  ) {}
}
