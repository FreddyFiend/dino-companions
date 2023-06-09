import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { Prisma, Roles, User } from '@prisma/client';
import { Request } from 'express';
import { UserDataDto } from './dto/user-data.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // async findAll(params: {
  //   skip?: number;
  //   take?: number;
  //   cursor?: Prisma.UserWhereUniqueInput;
  //   where?: Prisma.UserWhereInput;
  //   orderBy?: Prisma.UserOrderByWithRelationInput;
  // }): Promise<User[]> {
  //   const { skip, take, cursor, where, orderBy } = params;
  //   return this.prisma.user.findMany({
  //     // skip,
  //     // cursor,
  //     // where,
  //     // orderBy,
  //   });
  // }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findRoles(userId: string): Promise<Roles[] | null> {
    return this.prisma.roles.findMany({
      where: {
        userId,
      },
    });
  }

  async findOneWithProducts(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      include: {
        products: true,
      },
    });
  }
  async editUser(id: string, userData: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name: userData.name,
      },
    });
  }
  async addRole(req: Request, reqData: any) {
    try {
      const resp = await this.prisma.roles.create({
        data: {
          name: 'admin',
          user: {
            connect: {
              id: '89526dd9-c226-41f0-9ff6-f7c026cadd14',
            },
          },
        },
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
      });
      return resp;
    } catch (err) {
      if (err.code === 'P2002' && err.meta.target.includes('name')) {
        throw new UnprocessableEntityException(
          'The role already exists for this user.',
        );
      } else {
        console.error(err);
        throw new Error('Unknown Error');
      }
    }
  }
}
