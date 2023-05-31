import { Prisma } from '@prisma/client';
export declare class CreateProductDto {
    title: string;
    description?: string;
    quantity: number;
    price: number;
    seller?: Prisma.UserCreateNestedOneWithoutProductsInput;
}
