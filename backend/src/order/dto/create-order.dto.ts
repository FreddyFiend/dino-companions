import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDecimal,
} from 'class-validator';

class Item {
  productId: string;

  @IsDecimal()
  quantity: number;
}

class Address {
  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  address: string;
}

export class CreateOrderDto {
  items: Item[];

  address: Address;
  @IsOptional()
  total?: Number;
}
