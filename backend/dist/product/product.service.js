"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const rxjs_1 = require("rxjs");
const axios_1 = require("@nestjs/axios");
let ProductService = class ProductService {
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async create(productData, file, user) {
        const formData = new FormData();
        formData.append('image', file.buffer.toString('base64'));
        const { data: imageData } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post(`https://api.imgbb.com/1/upload?&key=${process.env.IMGBB_API_KEY}`, formData)
            .pipe((0, rxjs_1.catchError)((error) => {
            throw error;
        })));
        const data = {
            title: productData.title,
            description: productData.description,
            imageUrl: imageData.data.url,
            imageThumb: imageData.data.thumb.url,
            imageDeleteUrl: imageData.data.delete_url,
            sellerId: user.sub,
            quantity: productData.quantity,
            price: productData.price,
        };
        const product = await this.prisma.product.create({
            data,
        });
        return product;
    }
    findAll(queryParams) {
        const { price, date, page, rating, best } = queryParams;
        console.log(rating);
        let parsedRating = 0;
        let and = [];
        let sortParams = [];
        if (best) {
            sortParams.push({ rating: best });
        }
        date ? sortParams.push({ createdAt: date }) : '';
        if (price && price !== 'all') {
            let range = price.split('-');
            and.push({
                price: {
                    gt: parseInt(range[0]),
                },
            });
            and.push({
                price: {
                    lt: parseInt(range[1]),
                },
            });
        }
        if (rating) {
            parsedRating = parseFloat(rating);
        }
        let skip = 0 + page ? parseInt(page) * 10 : 0;
        return this.prisma.$transaction([
            this.prisma.product.count(),
            this.prisma.product.findMany({
                orderBy: sortParams,
                where: {
                    AND: and,
                    rating: {
                        gte: parsedRating,
                    },
                },
                include: {
                    seller: {
                        select: {
                            name: true,
                            email: true,
                            id: true,
                        },
                    },
                },
                take: 10,
                skip: skip,
            }),
        ]);
    }
    async createReview(review, userId) {
        const createdReview = await this.prisma.reviews.create({
            data: {
                text: review.text,
                rating: review.rating,
                userId: userId,
                productId: review.productId,
            },
        });
        const aggregatedResult = await this.prisma.reviews.aggregate({
            where: {
                productId: createdReview.productId,
            },
            _avg: {
                rating: true,
            },
            _count: {
                rating: true,
            },
        });
        await this.prisma.product.update({
            where: {
                id: createdReview.productId,
            },
            data: {
                rating: aggregatedResult._avg.rating,
                totalReviews: aggregatedResult._count.rating,
            },
        });
        return createdReview;
    }
    async findOne(id, userId) {
        console.log(userId);
        return this.prisma.$transaction([
            this.prisma.reviews.aggregate({
                where: {
                    productId: id,
                },
                _avg: {
                    rating: true,
                },
                _count: {
                    rating: true,
                },
            }),
            this.prisma.product.findUnique({
                where: {
                    id,
                },
                include: {
                    seller: {
                        select: {
                            name: true,
                            id: true,
                            email: true,
                            products: {
                                take: 6,
                            },
                        },
                    },
                    reviews: {
                        where: {
                            userId,
                            productId: id,
                        },
                        include: {
                            user: {
                                select: {
                                    email: true,
                                    name: true,
                                    id: true,
                                },
                            },
                        },
                    },
                },
            }),
        ]);
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    async remove(id) {
        const product = await this.prisma.product.delete({
            where: {
                id,
            },
        });
        return `Deleted ${product.title} successfully`;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        axios_1.HttpService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map