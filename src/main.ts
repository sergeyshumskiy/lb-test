import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import helmet from 'helmet';

const logger = new Logger('root');
let isShutdownStarted = false;

async function startGracefulShutdown(app: INestApplication): Promise<void> {
  if (isShutdownStarted) {
    return;
  }
  isShutdownStarted = true;

  logger.log('Starting shutdown of service...');
  try {
    await app.close();
    logger.log('Service successfully shutdown');
    process.exit(0);
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });
  const config = app.get(ConfigService);
  const port = config.get<number>('port', 3000);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes();
  await app.listen(port);
  logger.log(`Service is listening on port ${port}`);

  process.on('SIGINT', () => void startGracefulShutdown(app));
  process.on('SIGTERM', () => void startGracefulShutdown(app));
}

bootstrap();
