import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
} from 'class-validator';
export class CheckoutItemsDto {
  @IsString()
  itemId: string;

  @IsNumber()
  quantity: number;

}
