import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';
export declare class RolesGuard implements CanActivate {
    private userService;
    private reflector;
    constructor(userService: UserService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
