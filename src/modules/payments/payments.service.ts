import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PaymentApiService } from '../../libs/payment-api/payment.api.service';
import {
  CreatePaymentDto,
  CompletePaymentDto,
  Complete3DSDto,
} from './payments.dto';
import { PaymentsView } from './payments.view';
import {
  CreatePaymentResponse,
  CompletePaymentResponse,
} from './paymemts.interface';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly paymentApiService: PaymentApiService,
    private readonly paymentsView: PaymentsView,
  ) {}

  public async createPayment(
    data: CreatePaymentDto,
  ): Promise<CreatePaymentResponse> {
    const payload = this.paymentsView.createPaymentPayload(data);
    const response = await this.paymentApiService.createPayment(payload);

    if (!response) {
      throw new UnprocessableEntityException();
    }

    return this.paymentsView.createPaymentResponse(response);
  }

  public async completePayment(
    data: CompletePaymentDto,
    remoteIp: string,
  ): Promise<CompletePaymentResponse> {
    const directPostUrl = data.directPostUrl;
    const payload = this.paymentsView.createCompletePaymentPayload(
      data,
      remoteIp,
    );
    const response = await this.paymentApiService.completePayment(
      payload,
      directPostUrl,
    );
    if (!response) {
      throw new UnprocessableEntityException();
    }
    return this.paymentsView.completePaymentResponse(response);
  }

  public async complete3DS(data: Complete3DSDto): Promise<any> {
    return this.paymentApiService.complete3DS(data);
  }
}
