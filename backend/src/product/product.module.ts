import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductController],
  providers: [ProductService, UserService, PrismaService],
})
export class ProductModule {}
