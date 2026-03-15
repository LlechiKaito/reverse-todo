export class DailyLog {
  constructor(
    public readonly id: string,
    public readonly challengeId: string,
    public readonly date: Date,
    public readonly success: boolean,
  ) {}
}
