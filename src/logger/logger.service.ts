import { Injectable, LoggerService } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

const transformLevelToUpperCase = format((info) => {
  info.level = info.level.toUpperCase();

  return info;
});

const customFormat = format.combine(
  transformLevelToUpperCase(),
  format.timestamp(),
  format.errors({ stack: true }),
  format.json(),
);

@Injectable()
export class Logger implements LoggerService {
  private readonly logger = createLogger({
    level: 'info',
    format: customFormat,
    transports: [
      new transports.Console({
        handleExceptions: true,
      }),
    ],
  });

  private prepareMeta(
    context?: string | Record<string, any>,
    extra?: Record<string, any>,
  ) {
    let meta: Record<string, any> = {};

    if (typeof context === 'string') {
      meta.context = context;
    } else if (typeof context === 'object' && context !== null) {
      meta = { ...context };
    }

    if (extra) {
      meta = { ...meta, ...extra };
    }

    return meta;
  }

  public log(message: string, context?: string | Record<string, any>): void {
    this.logger.info(message, this.prepareMeta(context));
  }

  public info(message: string, context?: string | Record<string, any>): void {
    this.logger.info(message, this.prepareMeta(context));
  }

  public error(
    message: string,
    trace?: string,
    context?: string | Record<string, any>,
  ): void {
    this.logger.error(
      message,
      this.prepareMeta(context, trace ? { trace } : {}),
    );
  }

  public warn(message: string, context?: string | Record<string, any>): void {
    this.logger.warn(message, this.prepareMeta(context));
  }

  public debug(message: string, context?: string | Record<string, any>): void {
    this.logger.debug(message, this.prepareMeta(context));
  }

  public verbose(
    message: string,
    context?: string | Record<string, any>,
  ): void {
    this.logger.verbose(message, this.prepareMeta(context));
  }
}
