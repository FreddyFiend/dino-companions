import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';
import { Express } from 'express';
import { UserDataDto } from 'src/user/dto/user-data.dto';
import { catchError, firstValueFrom, take } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import * as FormData from 'form-data';
import { CheckoutItemsDto } from './dto/checkout-items-dto';
import Stripe from 'stripe';

@Injectable()
export class ProductService {
  stripe: Stripe;
  constructor(private prisma: PrismaService, private httpService: HttpService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      typescript: true,
      apiVersion: '2022-11-15',
    });
  }
  async create(
    productData: Prisma.ProductCreateInput,
    file: Express.Multer.File,
    user: UserDataDto,
  ): Promise<Product> {
    const formData = new FormData();
    formData.append('image', file.buffer.toString('base64'));
    const { data: imageData } = await firstValueFrom(
      this.httpService
        .post(
          `https://api.imgbb.com/1/upload?&key=${process.env.IMGBB_API_KEY}`,
          formData,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error;
          }),
        ),
    );
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

  async checkout(checkoutItems: CheckoutItemsDto[], userId: string) {
    console.log(checkoutItems);
    const checkoutItemsList = checkoutItems;
    const productIds = checkoutItemsList.map((item) => item.itemId);
    const products = await this.prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: {
        price: true,
        id: true,
        title: true,
      },
    });

    const lineItems = products.map((item) => {
      let confirmedItem = {};
      checkoutItemsList.forEach((chItem) => {
        if (chItem.itemId === item.id) {
          confirmedItem = {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
              },
              unit_amount: item.price * 100,
            },
            quantity: chItem.quantity,
          };
        }
      });

      return confirmedItem;
    });
    try {
      const session = await this.stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: `${process.env.SERVER_URL}/success`,
        cancel_url: `${process.env.SERVER_URL}/cancel`,
      });
      return session.url;
    } catch (e) {
      console.error(e);
      return false;
    }

    // res.redirect(303, session.url);
  }

  findAll(queryParams) {
    const { price, date, page, rating, best } = queryParams;
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

  async createReview(review: CreateReviewDto, userId: string) {
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
  //   prods
  //   150b0784-f1a6-41c9-948f-498bc18ddfdb
  //   30d37de2-5565-43fc-b5f9-96724098e10b

  // user
  //   89526dd9-c226-41f0-9ff6-f7c026cadd14

  async findOne(id: string, userId: string | null) {
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    const product = await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return `Deleted ${product.title} successfully`;
  }
}
