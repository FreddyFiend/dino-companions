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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(createOrderDto) {
        return 'This action adds a new order';
    }
    findAll() {
        return `This action returns all order`;
    }
    async createOrder(order, userId) {
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
            throw new common_1.BadRequestException('No product selected!', {
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
    async updateOrderCompletion(id) {
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
    findOne(id) {
        return `This action returns a #${id} order`;
    }
    update(id, updateOrderDto) {
        return `This action updates a #${id} order`;
    }
    remove(id) {
        return `This action removes a #${id} order`;
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map