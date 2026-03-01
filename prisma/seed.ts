import { PrismaClient, TodoStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.todo.deleteMany();

  // Create todos
  await prisma.todo.create({
    data: {
      title: 'ログイン画面のバグ修正',
      description: 'パスワードリセットのリンクが動作しない問題を修正する',
      status: TodoStatus.IN_PROGRESS,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'ダッシュボードの新規グラフ追加',
      description: '月次売上のグラフをダッシュボードに追加する',
      status: TodoStatus.PENDING,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'ユーザープロフィールページ作成',
      description: null,
      status: TodoStatus.PENDING,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'API レスポンスのキャッシュ実装',
      description: 'Redis を使った API レスポンスキャッシュを導入する',
      status: TodoStatus.COMPLETED,
    },
  });

  await prisma.todo.create({
    data: {
      title: 'メール通知の文面修正',
      description: '通知メールのフッターにプライバシーポリシーリンクを追加',
      status: TodoStatus.IN_PROGRESS,
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
