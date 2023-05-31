import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}
  create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  async createOrder(order: CreateOrderDto, userId: string) {
    console.log(order);

    const newOrder = await this.prisma.order.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        total: 0,
      },
    });
    let totalPrice = 0;
    const newItems = [];
    for (const item of order.items) {
      const newItem = await this.prisma.orderItems.create({
        data: {
          quantity: item.quantity,
          productId: item.productId,
          orderId: newOrder.id,
        },
        include: {
          product: true,
        },
      });
      totalPrice += newItem.quantity * newItem.product.price;
      newItems.push(newItem);
    }

    if (newItems.length <= 0) {
      throw new BadRequestException('No product selected!', {
        cause: new Error(),
        description: 'Please add products into cart to make this request',
      });
    }

    const itemIds = newItems.map((item) => {
      return { id: item.id };
    });

    const updatedOrder = await this.prisma.order.update({
      where: {
        id: newOrder.id,
      },
      data: {
        items: {
          connect: itemIds,
        },
        total: totalPrice,
      },
    });
    return updatedOrder;
  }

  async updateOrderCompletion(id: string) {
    const updatedOrder = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        isCompleted: true,
      },
    });
    return updatedOrder;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
