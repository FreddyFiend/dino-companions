import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AtGuard } from 'src/auth/at.guard';
import { UserData } from 'src/user/decorators/user.decorator';
import { UserDataDto } from 'src/user/dto/user-data.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Post('order')
  @UseGuards(AtGuard)
  // @UseGuards(AtGuard)
  addOrder(
    @Body(new ValidationPipe({ transform: true })) order: CreateOrderDto,
    @UserData() userData: UserDataDto,
  ) {
    return this.orderService.createOrder(order, userData.sub);
  }

  @Patch(':id')
  updateOrderCompletion(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderCompletion(id);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
