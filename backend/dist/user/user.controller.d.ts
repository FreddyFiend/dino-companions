import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { AddRoleDto } from './dto/add-role-dto';
import { UserDataDto } from './dto/user-data.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findOne(user: UserDataDto): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    findOneWithProducts(params: any): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
    createRole(req: Request, data: AddRoleDto): Promise<import(".prisma/client").Roles & {
        user: {
            email: string;
            name: string;
        };
    }>;
    update(userData: UpdateUserDto, user: UserDataDto): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
}
