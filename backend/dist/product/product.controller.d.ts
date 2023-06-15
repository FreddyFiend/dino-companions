/// <reference types="multer" />
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { UserDataDto } from 'src/user/dto/user-data.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { CheckoutItemsDto } from './dto/checkout-items-dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(file: Express.Multer.File, productData: any, user: UserDataDto): Promise<import(".prisma/client").Product>;
    addReview(review: CreateReviewDto, user: UserDataDto): Promise<import(".prisma/client").Reviews>;
    checkout(checkoutItems: CheckoutItemsDto[], user: UserDataDto): Promise<string | false>;
    findAll(query: any): Promise<(number | {
        id: string;
        title: string;
        imageUrl: string;
        imageThumb: string;
        description: string;
        published: boolean;
        sellerId: string;
        quantity: number;
        price: number;
        rating: number;
        totalReviews: number;
        createdAt: Date;
        updatedAt: Date;
        seller: {
            email: string;
            name: string;
            id: string;
        };
    }[])[]>;
    findOne(id: string, userData: UserDataDto): Promise<[Prisma.GetReviewsAggregateType<{
        where: {
            productId: string;
        };
        _avg: {
            rating: true;
        };
        _count: {
            rating: true;
        };
    }>, import(".prisma/client").Product & {
        reviews: (import(".prisma/client").Reviews & {
            user: {
                email: string;
                name: string;
                id: string;
            };
        })[];
        seller: {
            email: string;
            name: string;
            products: import(".prisma/client").Product[];
            id: string;
        };
    }]>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<string>;
}
