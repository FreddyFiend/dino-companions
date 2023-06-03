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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findOne(userWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async findOneWithProducts(userWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
            include: {
                products: true,
            },
        });
    }
    async editUser(id, userData) {
        return this.prisma.user.update({
            where: {
                id,
            },
            data: {
                name: userData.name,
            },
        });
    }
    async addRole(req, reqData) {
        try {
            const resp = await this.prisma.roles.create({
                data: {
                    name: 'admin',
                    user: {
                        connect: {
                            id: '89526dd9-c226-41f0-9ff6-f7c026cadd14',
                        },
                    },
                },
                include: {
                    user: {
                        select: {
                            email: true,
                            name: true,
                        },
                    },
                },
            });
            return resp;
        }
        catch (err) {
            if (err.code === 'P2002' && err.meta.target.includes('name')) {
                throw new common_1.UnprocessableEntityException('The role already exists for this user.');
            }
            else {
                console.error(err);
                throw new Error('Unknown Error');
            }
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map