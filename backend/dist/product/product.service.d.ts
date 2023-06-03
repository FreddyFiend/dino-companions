/// <reference types="multer" />
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';
import { UserDataDto } from 'src/user/dto/user-data.dto';
import { HttpService } from '@nestjs/axios';
import { CreateReviewDto } from './dto/create-review.dto';
export declare class ProductService {
    private prisma;
    private httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    create(productData: Prisma.ProductCreateInput, file: Express.Multer.File, user: UserDataDto): Promise<Product>;
    findAll(queryParams: any): Promise<[number, (Product & {
        seller: {
            id: string;
            name: string;
            email: string;
        };
    })[]]>;
    createReview(review: CreateReviewDto, userId: string): Promise<import(".prisma/client").Reviews>;
    findOne(id: string, userId: string | null): Promise<[Prisma.GetReviewsAggregateType<{
        where: {
            productId: string;
        };
        _avg: {
            rating: true;
        };
        _count: {
            rating: true;
        };
    }>, Product & {
        seller: {
            id: string;
            name: string;
            email: string;
            products: Product[];
        };
        reviews: (import(".prisma/client").Reviews & {
            user: {
                id: string;
                name: string;
                email: string;
            };
        })[];
    }]>;
    update(id: number, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
