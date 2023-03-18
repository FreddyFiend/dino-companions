import { Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable({})
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: any, res: Response) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    /* res.cookie('token', access_token, {
         httpOnly: true,
    }); */
    res.cookie('token', access_token, {
      sameSite: 'strict',
      httpOnly: true,
    });
    return { access_token };
  }
}
