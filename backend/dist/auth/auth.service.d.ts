import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Tokens } from './types';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto } from 'src/user/dto/user-data.dto';
export declare class AuthService {
    private prisma;
    private userService;
    private jwtService;
    constructor(prisma: PrismaService, userService: UserService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<{
        id: string;
        email: string;
        name: string;
        hashedRt: string;
    }>;
    setTokensToCookie(res: Response, access_token: any, refresh_token: any): Promise<void>;
    login(user: any, res: Response): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logOut(user: UserDataDto): void;
    refreshTokens(userId: string, rt: string, res: Response): Promise<Tokens>;
    updateRtHash(userId: string, rt: string): Promise<void>;
    createUser(data: Prisma.UserCreateInput, res: Response): Promise<any>;
    getTokens(userId: string, email: string): Promise<Tokens>;
}
