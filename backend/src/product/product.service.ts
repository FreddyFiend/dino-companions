import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';
import { Express } from 'express';
import { UserDataDto } from 'src/user/dto/user-data.dto';
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private httpService: HttpService,
  ) {}
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

  findAll(queryParams) {
    // console.log(queryParams);
    const { price, date, page } = queryParams;
    let where = {};
    let sortParams = [];
    date ? sortParams.push({ createdAt: date }) : '';
    if (price && price !== 'all') {
      let range = price.split('-');
      where = {
        AND: [
          {
            price: {
              gt: parseInt(range[0]),
            },
          },
          {
            price: {
              lt: parseInt(range[1]),
            },
          },
        ],
      };
    }

    let skip = 0 + page ? parseInt(page) * 2 : 0;
    // console.log(sortParams);
    return this.prisma.$transaction([
      this.prisma.product.count(),
      this.prisma.product.findMany({
        orderBy: sortParams,
        where,
        include: {
          seller: {
            select: {
              name: true,
              email: true,
              id: true,
            },
          },
        },
        take: 2,
        skip: skip,
      }),
    ]);
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
