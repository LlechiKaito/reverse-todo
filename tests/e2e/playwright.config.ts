import { defineConfig } from '@playwright/test';

const DOCKER_HOST_IP =
  process.env.DOCKER_HOST?.replace('tcp://', '').replace(/:.*/, '') ||
  'localhost';

export default defineConfig({
  testDir: '.',
  timeout: 30000,
  retries: 1,
  use: {
    baseURL: `http://${DOCKER_HOST_IP}:3000`,
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
});
