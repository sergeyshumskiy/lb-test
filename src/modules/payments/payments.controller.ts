import { Controller, Post, Body, Ip } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  CreatePaymentDto,
  CompletePaymentDto,
  Complete3DSDto,
} from './payments.dto';
import {
  CreatePaymentResponse,
  CompletePaymentResponse,
} from './paymemts.interface';

@Controller('payments')
@UseGuards(ThrottlerGuard)
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  public async createPayment(
    @Body() data: CreatePaymentDto,
  ): Promise<CreatePaymentResponse> {
    return this.paymentsService.createPayment(data);
  }

  @Post('complete')
  public async completePayment(
    @Body() data: CompletePaymentDto,
    @Ip() ip: string,
  ): Promise<CompletePaymentResponse> {
    return this.paymentsService.completePayment(data, ip);
  }

  @Post('3ds-callback')
  public async complete3DS(@Body() data: Complete3DSDto): Promise<any> {
    return this.paymentsService.complete3DS(data);
  }
}
