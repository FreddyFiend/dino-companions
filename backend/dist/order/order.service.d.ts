import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): string;
    findAll(): string;
    createOrder(order: CreateOrderDto, userId: string): Promise<import(".prisma/client").Order>;
    updateOrderCompletion(id: string): Promise<import(".prisma/client").Order>;
    findOne(id: number): string;
    update(id: number, updateOrderDto: UpdateOrderDto): string;
    remove(id: number): string;
}
