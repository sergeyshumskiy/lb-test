export interface Client {
  email: string;
}

export interface Product {
  price: number;
  name: string;
}

export interface Purchase {
  currency?: string;
  products: Product[];
}

export interface CreatePaymentResponse {
  client: Client;
  purchase: Purchase;
  checkoutUrl: string;
  directPostUrl: string | null;
}

export interface CompletePaymentResponse {
  status: string;
  PaReq?: string;
  MD?: string;
  callbackUrl?: string;
  Method?: string;
  URL?: string;
}

export interface ThreeDSecureResponse {
  status: string;
  Method?: string;
  URL?: string;
  PaReq?: string;
  MD?: string;
  callback_url?: string;
}

export interface RawPaymentData {
  client: {
    email: string;
  };
  purchase: Purchase;
  checkout_url: string;
  direct_post_url: string;
}

export interface Complete3DSPayload {
  callbackUrl: string;
  MD: string;
  PaRes: string;
}

export interface Complete3DSRequestPayload {
  MD: string;
  PaRes: string;
}

export interface Complete3DSRequestQuery {
  callbackUrl: string;
}
