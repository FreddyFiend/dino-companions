import { CanActivate, ExecutionContext, Injectable, Req } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const req = context.switchToHttp().getRequest();
    console.log(roles);

    return true;
  }
}
