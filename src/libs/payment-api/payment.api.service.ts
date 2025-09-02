import { Injectable, BadGatewayException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { isAxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import {
  CreatePaymentPayload,
  CompletePaymentPayload,
  complete3DSPayload,
  CompletePaymentApiResponse,
  RawPaymentData,
} from './payment.api.interface';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class PaymentApiService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
    private readonly logger: Logger,
  ) {}

  public async createPayment(
    payload: CreatePaymentPayload,
  ): Promise<RawPaymentData | undefined> {
    const url = this.configService.get<string>('apiUrl');
    const apiKey = this.configService.get<string>('apiKey');
    try {
      const response = await firstValueFrom(
        this.http.post(`${url}/purchases/`, payload, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        }),
      );
      return response.data as RawPaymentData;
    } catch (err) {
      this.handleException(err, 'create payment');
    }
  }

  public async completePayment(
    payload: CompletePaymentPayload,
    directPostUrl: string,
  ): Promise<CompletePaymentApiResponse | undefined> {
    const s2sToken = this.configService.get<string>('s2sToken');
    try {
      const response = await firstValueFrom(
        this.http.post(`${directPostUrl}`, payload, {
          headers: {
            Authorization: `Bearer ${s2sToken}`,
            'Content-Type': 'application/json',
          },
          params: {
            s2s: true,
          },
        }),
      );
      return response.data as CompletePaymentApiResponse;
    } catch (err) {
      this.handleException(err, 'complete payment');
    }
  }

  public async complete3DS(data: complete3DSPayload): Promise<any> {
    const payload = new URLSearchParams();
    payload.append('MD', data.MD || '');
    payload.append('PaRes', data.PaRes);

    try {
      const response = await firstValueFrom(
        this.http.post(`${data.callbackUrl}`, payload.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );
      return response.data;
    } catch (err) {
      this.handleException(err, 'complete 3ds');
    }
  }

  private handleException(error: unknown, operationDetails: string) {
    if (error instanceof Error || isAxiosError(error)) {
      this.logger.error(error.message, error.stack);
    } else {
      this.logger.error('Unknown error');
    }

    throw new BadGatewayException(operationDetails);
  }
}
