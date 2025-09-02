import { Module, Global } from '@nestjs/common';
import { Logger } from './logger.service';
import { LoggingInterceptor } from './logger.intercepter';
@Global()
@Module({
  providers: [Logger, LoggingInterceptor],
  exports: [Logger, LoggingInterceptor],
})
export class LoggerModule {}
