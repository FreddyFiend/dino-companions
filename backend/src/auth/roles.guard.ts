import { CanActivate, ExecutionContext, Injectable, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';

import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    let isAuthorized = false;
    const request = context.switchToHttp().getRequest();

    const userRoles = await this.userService.findRoles(request.user.sub);
    userRoles?.forEach((role) => {
      if (roles.includes(role.name)) {
        return (isAuthorized = true);
      }
    });

    return isAuthorized;
  }
}
