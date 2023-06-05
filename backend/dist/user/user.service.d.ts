import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Roles, User } from '@prisma/client';
import { Request } from 'express';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    findRoles(userId: string): Promise<Roles[] | null>;
    findOneWithProducts(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    editUser(id: string, userData: UpdateUserDto): Promise<User>;
    addRole(req: Request, reqData: any): Promise<Roles & {
        user: {
            email: string;
            name: string;
        };
    }>;
}
