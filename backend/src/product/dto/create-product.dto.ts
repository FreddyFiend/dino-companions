import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDecimal,
} from 'class-validator';
export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsNumber()
  quantity: number;
  @IsDecimal()
  price: number;
  seller?: Prisma.UserCreateNestedOneWithoutProductsInput;
}
