import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreatePaymentPayload,
  CompletePaymentPayload,
} from '../../libs/payment-api/payment.api.interface';
import { CreatePaymentDto, CompletePaymentDto } from './payments.dto';
import {
  CreatePaymentResponse,
  CompletePaymentResponse,
  ThreeDSecureResponse,
  RawPaymentData,
} from './paymemts.interface';

@Injectable()
export class PaymentsView {
  private readonly brandId: string;

  constructor(private readonly configService: ConfigService) {
    this.brandId = this.configService.get<string>('brandId', '');
  }

  public createPaymentPayload(data: CreatePaymentDto): CreatePaymentPayload {
    return {
      client: {
        email: data.client.email,
      },
      purchase: data.purchase,
      brand_id: this.brandId,
      success_redirect: 'http://localhost:3001/success',
      failure_redirect: 'http://localhost:3001/failure',
    };
  }

  public createCompletePaymentPayload(
    data: CompletePaymentDto,
    remoteIp: string,
  ): CompletePaymentPayload {
    return {
      card_number: data.cardNumber,
      cardholder_name: data.cardHolderName,
      cvc: data.cvc,
      expires: data.expires,
      remote_ip: remoteIp,
    };
  }

  public createPaymentResponse(data: RawPaymentData): CreatePaymentResponse {
    return {
      client: {
        email: data.client.email,
      },
      purchase: {
        products: data.purchase.products,
      },
      checkoutUrl: data.checkout_url,
      directPostUrl: data.direct_post_url,
    };
  }

  public completePaymentResponse(
    data: ThreeDSecureResponse,
  ): CompletePaymentResponse {
    return {
      status: data.status,
      PaReq: data.PaReq,
      MD: data.MD,
      callback_url: data.callback_url,
    };
  }
}
