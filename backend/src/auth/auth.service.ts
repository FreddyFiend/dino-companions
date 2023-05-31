import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { JwtPayload, Tokens } from './types';
import * as argon from 'argon2';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { UserDataDto } from 'src/user/dto/user-data.dto';

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne({ email });
    if (user) {
      console.log(user.password);
      const passwordMatches = await argon.verify(user.password, pass);
      if (passwordMatches) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async setTokensToCookie(res: Response, access_token, refresh_token) {
    res.cookie('accessToken', access_token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });
    res.cookie('refreshToken', refresh_token, {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
    });
  }
  async login(user: any, res: Response) {
    const payload = { email: user.email, sub: user.id };

    const { access_token, refresh_token } = await this.getTokens(
      user.id,
      user.email,
    );

    await this.updateRtHash(user.id, refresh_token);
    await this.setTokensToCookie(res, access_token, refresh_token);
    return { access_token, refresh_token };
  }

  logOut(user: UserDataDto) {
    this.prisma.user.updateMany({
      where: {
        id: user.sub,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }
  async refreshTokens(
    userId: string,
    rt: string,
    res: Response,
  ): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.hashedRt)
      throw new ForbiddenException("Access Denied hash don't exists");

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches)
      throw new ForbiddenException("Access Denied hash didn't match");

    const tokens = await this.getTokens(user.id, user.email);
    await this.setTokensToCookie(
      res,
      tokens.access_token,
      tokens.refresh_token,
    );
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput, res: Response): Promise<any> {
    const { password } = data;
    const hashedPassword = await argon.hash(password);
    const newUser = await this.prisma.user.create({
      data: { email: data.email, password: hashedPassword },
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);

    this.setTokensToCookie(res, tokens.access_token, tokens.refresh_token);
    return tokens;
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_JWT,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_JWT,
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
