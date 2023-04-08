import { AuthService } from './auth.service';
import {
  Controller,
  Res,
  Get,
  Post,
  UseGuards,
  Logger,
  Body,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LocalAuthGuard } from './local-auth.guard';
import { AtGuard } from './at.guard';
import { RtGuard } from './rt.guard';
import { User } from '@prisma/client';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } = await this.authService.login(
      req.user,
      res,
    );
    return { user: { id: req.user.id, email: req.user.email } };
  }

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: User, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } = await this.authService.createUser(
      dto,
      res,
    );

    return { msg: 'success' };
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log('below me is user req');
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(
        req.user.sub,
        req.cookies.refreshToken,
        res,
      );

    return { msg: 'success' };
  }

  @Get('profile')
  @UseGuards(AtGuard)
  getProfile(@Req() req) {
    console.log(req.cookies);
    return req.user;
  }
}
