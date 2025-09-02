import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { HealthCheck, type HealthCheckResult } from '@nestjs/terminus';

import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('liveness')
  @HealthCheck()
  public liveness(): HealthCheckResult {
    return this.healthService.livenessCheck();
  }

  @Get('readiness')
  @HealthCheck()
  public async readiness(): Promise<HealthCheckResult> {
    const result = this.healthService.readinessCheck();

    if (this.healthService.isGracefulShutdownStarted) {
      throw new ServiceUnavailableException(result);
    }

    return result;
  }
}
