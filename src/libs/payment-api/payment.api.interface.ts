export interface CreatePaymentPayload {
  client: ClientInfo;
  purchase: PurchaseInfo;
  brand_id: string;
  success_redirect: string;
  failure_redirect: string;
}

export interface ClientInfo {
  email: string;
}

export interface PurchaseInfo {
  currency: string;
  products: ProductInfo[];
}

export interface ProductInfo {
  name: string;
  price: number;
}

export interface CompletePaymentPayload {
  cardholder_name: string;
  card_number: string;
  expires: string;
  cvc: string;
  remote_ip: string;
}

export interface complete3DSPayload {
  callbackUrl: string;
  MD: string;
  PaRes: string;
}

export interface CompletePaymentApiResponse {
  status: string;
  PaReq?: string;
  MD?: string;
  callback_url?: string;
}

export interface RawPaymentData {
  client: ClientInfo;
  purchase: PurchaseInfo;
  checkout_url: string;
  direct_post_url: string;
}
