import './telemetry/telemetry';
import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HealthService } from './modules/healthz/health.service';
import { Logger } from './logger/logger.service';
import { LoggingInterceptor } from './logger/logger.intercepter';
import helmet from 'helmet';

let isShutdownStarted = false;

async function startGracefulShutdown(
  app: INestApplication,
  logger: Logger,
): Promise<void> {
  if (isShutdownStarted) {
    return;
  }
  isShutdownStarted = true;

  logger.log('Starting shutdown of service...');
  try {
    const healthService = app.get(HealthService);
    await healthService.startGracefulShutdown();
    await app.close();
    logger.log('Service successfully shutdown');
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);
  const port = config.get<number>('port', 3000);
  const logger = app.get(Logger);

  app.useLogger(logger);
  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(app.get(LoggingInterceptor));
  await app.listen(port);
  logger.log(`Service is listening on port ${port}`);

  process.on('SIGINT', () => void startGracefulShutdown(app, logger));
  process.on('SIGTERM', () => void startGracefulShutdown(app, logger));
}

bootstrap();
