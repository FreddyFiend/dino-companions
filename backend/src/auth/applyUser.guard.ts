import { Injectable, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class ApplyUser extends AuthGuard('at') {
  handleRequest(err: any, user: any) {
    if (user) {
      return user;
    }

    return null;
  }
}
