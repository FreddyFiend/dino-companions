import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDecimal,
  Max,
  Min,
} from 'class-validator';
export class CreateReviewDto {
  @IsString()
  @IsOptional()
  text?: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  rating: number;

  @IsString()
  productId: string;
}
