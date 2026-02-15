import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { HttpExceptionFilter } from '@/presentation/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  const port = process.env.API_PORT;
  if (!port) {
    throw new Error('API_PORT is not set');
  }
  await app.listen(port);
  console.log(`API server running on http://localhost:${port}`);
}
bootstrap();
