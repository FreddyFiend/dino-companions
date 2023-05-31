import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { UserDataDto } from 'src/user/dto/user-data.dto';
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(user: User, res: Response): Promise<{
        user: User;
    }>;
    signup(dto: User, res: Response): Promise<{
        msg: string;
    }>;
    logout(user: UserDataDto, res: Response): Promise<{
        msg: string;
    }>;
    refresh(user: UserDataDto, req: any, res: Response): Promise<{
        msg: string;
    }>;
}
