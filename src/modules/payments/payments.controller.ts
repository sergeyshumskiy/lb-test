import { Controller, Post, Body, Ip, Query, Res } from '@nestjs/common';
import { type Response } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';
import { UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from './payments.service';
import {
  CreatePaymentDto,
  CompletePaymentDto,
  Complete3DSDto,
  Complete3DSDtoQuery,
} from './payments.dto';
import {
  CreatePaymentResponse,
  CompletePaymentResponse,
} from './paymemts.interface';
import { PaymentStatus } from '../../constants'

@Controller('payments')
@UseGuards(ThrottlerGuard)
@Controller('payments')
export class PaymentsController {
  private readonly frontendUrl: string;

  constructor(
    private readonly paymentsService: PaymentsService,
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<string>('frontendUrl', '');
  }

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
  public async complete3DS(
    @Body() data: Complete3DSDto,
    @Query() query: Complete3DSDtoQuery,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.paymentsService.complete3DS(data, query);
      return res.redirect(`${this.frontendUrl}/payments/completed?status=${PaymentStatus.SUCCESS}`);
    } catch {
      return res.redirect(`${this.frontendUrl}/payments/completed?status=${PaymentStatus.FAILURE}`);
    }
  }
}
