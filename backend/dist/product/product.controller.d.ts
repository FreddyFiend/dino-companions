/// <reference types="multer" />
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { UserDataDto } from 'src/user/dto/user-data.dto';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(file: Express.Multer.File, productData: any, user: UserDataDto): Promise<import(".prisma/client").Product>;
    addReview(review: CreateReviewDto, user: UserDataDto): Promise<import(".prisma/client").Reviews>;
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
            id: string;
            name: string;
            email: string;
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
        seller: {
            id: string;
            name: string;
            email: string;
            products: import(".prisma/client").Product[];
        };
        reviews: (import(".prisma/client").Reviews & {
            user: {
                id: string;
                name: string;
                email: string;
            };
        })[];
    }]>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): Promise<string>;
}
