import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { ERROR_MESSAGES } from '@/domain/constants/error-messages';
import { HttpExceptionFilter } from '@/presentation/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get<string>('API_PORT');
  if (!port) {
    throw new Error(ERROR_MESSAGES.API_PORT_NOT_SET);
  }

  await app.listen(port);
  logger.log(`API server running on http://localhost:${port}`);
}
bootstrap();
