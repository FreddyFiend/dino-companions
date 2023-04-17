import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User as UserModel } from '@prisma/client';
import { AtGuard } from 'src/auth/at.guard';
import { Request } from 'express';
import { AddRoleDto } from './dto/add-role-dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserData } from './decorators/user.decorator';
import { UserDataDto } from './dto/user-data.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll({});
  }

  @Get('profile')
  @UseGuards(AtGuard)
  async findOne(@UserData() user: UserDataDto) {
    console.log();
    const { password, ...result } = await this.userService.findOne({
      id: user.sub,
    });
    return result;
  }

  @Post('role')
  @UseGuards(AtGuard, RolesGuard)
  @Roles('killer', 'money')
  createRole(@Req() req: Request, @Body() data: AddRoleDto) {
    try {
      return this.userService.addRole(req, data);
    } catch (err) {
      throw new UnprocessableEntityException();
    }
  }

  // @Patch()
  // async update(@Body() userData: UpdateUserDto): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }
}
