import { Injectable } from '@nestjs/common';
import {
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorService,
  HealthIndicatorResult,
} from '@nestjs/terminus';

import { setTimeout } from 'node:timers/promises';

@Injectable()
export class HealthService {
  private gracefulShutdownStarted = false;

  constructor(
    private health: HealthCheckService,
    private readonly healthIndicatorService: HealthIndicatorService,
  ) {}

  public get isGracefulShutdownStarted() {
    return this.gracefulShutdownStarted;
  }

  public async startGracefulShutdown() {
    this.gracefulShutdownStarted = true;

    const timeoutMs = 0; // sync with health check periods time to notify that pod is terminating

    await setTimeout(timeoutMs);
  }

  public livenessCheck(): HealthCheckResult {
    return {
      status: 'ok',
      details: {
        service: {
          status: 'up',
        },
      },
    };
  }

  public async readinessCheck(): Promise<HealthCheckResult> {
    const indicators = [() => this.isHealthy('db')];

    return this.health.check(indicators);
  }

  private isHealthy(key: string): HealthIndicatorResult {
    const indicator = this.healthIndicatorService.check(key);

    try {
      //ping db here
      return indicator.up({ message: 'Up and running' });
    } catch {
      return indicator.down('Unable to connect to database');
    }
  }
}
