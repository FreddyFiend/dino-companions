import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserDataDto } from 'src/user/dto/user-data.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    create(createOrderDto: CreateOrderDto): string;
    addOrder(order: CreateOrderDto, userData: UserDataDto): Promise<import(".prisma/client").Order>;
    updateOrderCompletion(id: string, updateOrderDto: UpdateOrderDto): Promise<import(".prisma/client").Order>;
    findAll(): string;
    findOne(id: string): string;
    remove(id: string): string;
}
