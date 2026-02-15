import { PrismaClient, TodoStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.todoTag.deleteMany();
  await prisma.todo.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({
    data: { name: 'Alice', email: 'alice@example.com' },
  });

  const bob = await prisma.user.create({
    data: { name: 'Bob', email: 'bob@example.com' },
  });

  // Create tags
  const tagBug = await prisma.tag.create({ data: { name: 'バグ' } });
  const tagFeature = await prisma.tag.create({ data: { name: '機能追加' } });
  const tagDesign = await prisma.tag.create({ data: { name: 'デザイン' } });
  const tagUrgent = await prisma.tag.create({ data: { name: '緊急' } });

  // Create todos
  await prisma.todo.create({
    data: {
      title: 'ログイン画面のバグ修正',
      description: 'パスワードリセットのリンクが動作しない問題を修正する',
      status: TodoStatus.IN_PROGRESS,
      dueDate: new Date('2026-02-20'),
      userId: alice.id,
      tags: {
        create: [{ tagId: tagBug.id }, { tagId: tagUrgent.id }],
      },
    },
  });

  await prisma.todo.create({
    data: {
      title: 'ダッシュボードの新規グラフ追加',
      description: '月次売上のグラフをダッシュボードに追加する',
      status: TodoStatus.PENDING,
      dueDate: new Date('2026-03-01'),
      userId: alice.id,
      tags: {
        create: [{ tagId: tagFeature.id }],
      },
    },
  });

  await prisma.todo.create({
    data: {
      title: 'ユーザープロフィールページ作成',
      description: null,
      status: TodoStatus.PENDING,
      userId: bob.id,
      tags: {
        create: [{ tagId: tagFeature.id }, { tagId: tagDesign.id }],
      },
    },
  });

  await prisma.todo.create({
    data: {
      title: 'API レスポンスのキャッシュ実装',
      description: 'Redis を使った API レスポンスキャッシュを導入する',
      status: TodoStatus.COMPLETED,
      dueDate: new Date('2026-02-10'),
      userId: bob.id,
      tags: {
        create: [{ tagId: tagFeature.id }],
      },
    },
  });

  await prisma.todo.create({
    data: {
      title: 'メール通知の文面修正',
      description: '通知メールのフッターにプライバシーポリシーリンクを追加',
      status: TodoStatus.IN_PROGRESS,
      userId: alice.id,
      tags: {
        create: [{ tagId: tagBug.id }],
      },
    },
  });

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
