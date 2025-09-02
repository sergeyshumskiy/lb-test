import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsView } from './payments.view';
import { ThrottlerModule } from '@nestjs/throttler';
import { PaymentApiModule } from '../../libs/payment-api/payment.api.module';

@Module({
  imports: [
    PaymentApiModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 200,
        },
      ],
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaymentsView],
})
export class PaymentsModule {}
