import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Complete3DSDto {
  @IsString()
  @IsNotEmpty()
  callbackUrl: string;

  @IsString()
  MD: string;

  @IsString()
  PaRes: string;
}

export class CompletePaymentDto {
  @IsString()
  @IsNotEmpty()
  directPostUrl: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsString()
  @IsNotEmpty()
  cardNumber: string;

  @IsString()
  @IsNotEmpty()
  expires: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  cvc: string;
}

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;
}

export class PurchaseDto {
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  products: ProductDto[];
}

export class ClientDto {
  @IsEmail()
  email: string;
}

export class CreatePaymentDto {
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;

  @ValidateNested()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;
}
