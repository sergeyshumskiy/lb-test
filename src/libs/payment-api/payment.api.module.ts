import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentApiService } from './payment.api.service';

@Module({
  imports: [HttpModule],
  providers: [PaymentApiService],
  exports: [PaymentApiService],
})
export class PaymentApiModule {}
