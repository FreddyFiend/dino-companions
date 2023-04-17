import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
export class CreateProductDto {
  @IsString()
  title: string;

  @IsString()
  imageUrl: string;

  @IsString()
  imageDeleteUrl: string;

  @IsString()
  imageThumb: string;

  @IsString()
  imageMedium: string;

  @IsString()
  description?: string;

  @IsNumber()
  quantity: number;
  price: number;
  seller?: Prisma.UserCreateNestedOneWithoutProductsInput;
}
