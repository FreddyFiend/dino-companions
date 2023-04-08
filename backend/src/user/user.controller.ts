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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /*  @Post()
  async create(@Body() userData: CreateUserDto): Promise<UserModel> {
    return this.userService.createUser(userData);
  } */
  @Get()
  findAll() {
    return this.userService.findAll({});
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
