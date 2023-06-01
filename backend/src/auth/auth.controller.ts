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
import { UserService } from 'src/user/user.service';
import { UserData } from 'src/user/decorators/user.decorator';
import { UserDataDto } from 'src/user/dto/user-data.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @UserData() user: User,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } = await this.authService.login(
      user,
      res,
    );
    return { user };
  }

  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: User, @Res({ passthrough: true }) res: Response) {
    const { user } = await this.authService.createUser(dto, res);

    return { msg: 'Successfully registered your account!', user };
  }

  @UseGuards(RtGuard)
  @Get('local/logout')
  @HttpCode(HttpStatus.ACCEPTED)
  async logout(
    @UserData() user: UserDataDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    this.authService.logOut(user);
    return { msg: 'Successfully logged out!' };
  }

  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(
    @UserData() user: UserDataDto,
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log('below me is user req');
    const { access_token, refresh_token } =
      await this.authService.refreshTokens(
        user.sub,
        req.cookies.refreshToken,
        res,
      );

    return { msg: 'success' };
  }
}
