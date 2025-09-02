import { Module } from '@nestjs/common';
import { HealthController } from './healthz.controller';
import { HealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
