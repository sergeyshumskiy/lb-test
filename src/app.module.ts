import { Module } from '@nestjs/common';
import { PaymentsModule } from './modules/payments/payments.module';
import { HealthModule } from './modules/healthz/healthz.module';
import { PaymentApiModule } from './libs/payment-api/payment.api.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    PaymentApiModule,
    PaymentsModule,
    HealthModule,
    LoggerModule,
    ConfigModule,
  ],
})
export class AppModule {}
