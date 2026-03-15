import { test, expect } from '@playwright/test';

test.describe('Challenges - Home Page', () => {
  test('should display the home page with challenges', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'やめたいこと' })).toBeVisible();
    await expect(page.getByText('挑戦中')).toBeVisible();
    await expect(page.getByText('最長ストリーク')).toBeVisible();
    await expect(page.getByText('達成済み')).toBeVisible();
  });

  test('should display seeded challenges in habit list', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('すべての挑戦')).toBeVisible();
    await expect(page.getByText('無駄な会議に出席する')).toBeVisible();
  });

  test('should display featured card with streak', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('日連続')).toBeVisible();
    await expect(page.getByText('続いてるよ。このまま。')).toBeVisible();
  });

  test('should navigate to new challenge page', async ({ page }) => {
    await page.goto('/');

    await page.getByText('新規宣言').click();
    await expect(page).toHaveURL('/new');
    await expect(
      page.getByRole('heading', { name: '新しい挑戦を始める' }),
    ).toBeVisible();
  });
});

test.describe('Challenges - Create Flow', () => {
  test('should create a new challenge', async ({ page }) => {
    await page.goto('/new');

    await page.getByPlaceholder('夜食・お菓子').fill('テスト用の挑戦');
    await page
      .getByPlaceholder('健康診断で体重が増えていた')
      .fill('テスト理由');
    await page.getByRole('button', { name: '健康' }).click();
    await page.getByRole('button', { name: '挑戦を始める' }).click();

    await expect(page).toHaveURL('/');
    await expect(page.getByText('テスト用の挑戦')).toBeVisible();
  });

  test('should navigate back from new challenge page', async ({ page }) => {
    await page.goto('/new');

    await page.locator('button:has(svg.lucide-arrow-left)').click();
    await expect(page).toHaveURL('/', { timeout: 10000 });
  });

  test('submit button should be disabled without required fields', async ({
    page,
  }) => {
    await page.goto('/new');

    const submitButton = page.getByRole('button', { name: '挑戦を始める' });
    await expect(submitButton).toBeDisabled();
  });
});
