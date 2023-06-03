import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Prisma } from '@prisma/client';
import { UserData } from 'src/user/decorators/user.decorator';
import { AtGuard } from 'src/auth/at.guard';
import { UserDataDto } from 'src/user/dto/user-data.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateOrderDto } from '../order/dto/create-order.dto';
import { ApplyUser } from 'src/auth/applyUser.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(AtGuard)
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body()
    productData,
    @UserData() user: UserDataDto,
  ) {
    //console.log(file);
    const newData = JSON.parse(productData.data);
    console.log(user);
    console.log(file);
    return this.productService.create(newData, file, user);
  }

  @Post('review')
  @UseGuards(AtGuard)
  addReview(
    @Body(new ValidationPipe({ transform: true })) review: CreateReviewDto,
    @UserData() user: UserDataDto,
  ) {
    return this.productService.createReview(review, user.sub);
  }

  @Get()
  findAll(@Query() query) {
    console.log(query);
    return this.productService.findAll(query);
  }

  @Get(':id')
  @UseGuards(ApplyUser)
  findOne(@Param('id') id: string, @UserData() userData: UserDataDto) {
    // return this.productService.findOne(+id);
    return this.productService.findOne(id, userData?.sub || '');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
