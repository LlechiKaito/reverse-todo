import { PrismaClient, ChallengeCategory, TodoStatus } from '@prisma/client';

const prisma = new PrismaClient();

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

async function main() {
  // Clean existing data
  await prisma.dailyLog.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.todo.deleteMany();

  // Challenge 1: 7-day streak
  const c1 = await prisma.challenge.create({
    data: {
      title: '無駄な会議に出席する',
      reason: '集中時間が減って生産性が落ちる',
      category: ChallengeCategory.TIME,
    },
  });

  // Create 7 consecutive success logs (today through 6 days ago)
  for (let i = 0; i < 7; i++) {
    await prisma.dailyLog.create({
      data: { challengeId: c1.id, date: daysAgo(i), success: true },
    });
  }

  // Challenge 2: 3-day streak
  const c2 = await prisma.challenge.create({
    data: {
      title: '完璧主義で悩む',
      reason: '行動が遅くなるから',
      category: ChallengeCategory.HABIT,
    },
  });

  for (let i = 0; i < 3; i++) {
    await prisma.dailyLog.create({
      data: { challengeId: c2.id, date: daysAgo(i), success: true },
    });
  }

  // Challenge 3: 1-day streak (warning)
  const c3 = await prisma.challenge.create({
    data: {
      title: '夜更かしする',
      reason: '翌日のパフォーマンスが落ちる',
      category: ChallengeCategory.HEALTH,
    },
  });

  await prisma.dailyLog.create({
    data: { challengeId: c3.id, date: daysAgo(0), success: true },
  });
  await prisma.dailyLog.create({
    data: { challengeId: c3.id, date: daysAgo(1), success: false },
  });

  // Challenge 4: 14-day streak (featured)
  const c4 = await prisma.challenge.create({
    data: {
      title: '寝る前にSNSを見る',
      reason: '睡眠の質が下がるから',
      category: ChallengeCategory.DIGITAL,
    },
  });

  for (let i = 0; i < 14; i++) {
    await prisma.dailyLog.create({
      data: { challengeId: c4.id, date: daysAgo(i), success: true },
    });
  }

  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
