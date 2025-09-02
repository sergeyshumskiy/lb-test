import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from './logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const requestStartTime = Date.now().valueOf();
    const method = request.method;
    const url = request.url;
    const healthUrls = ['/health/liveness', '/health/readiness'];
    let isResponseLogged = false;

    if (healthUrls.includes(url)) {
      return next.handle();
    }

    this.logger.info('Incoming request:', { method, url });

    response.on('finish', () => {
      if (isResponseLogged) return;

      const responseTime = `${Date.now().valueOf() - requestStartTime}ms`;
      const statusCode = response.statusCode;
      const meta = {
        responseTime,
        method,
        url,
        statusCode,
      };

      if (statusCode < 400) {
        this.logger.info('Response sent:', meta);
      } else if (statusCode < 500) {
        this.logger.warn('Response sent:', meta);
      } else {
        this.logger.error('Response sent:', undefined, meta);
      }
      isResponseLogged = true;
    });

    return next.handle();
  }
}
