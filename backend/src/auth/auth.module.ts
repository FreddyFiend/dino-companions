import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport/dist';
//import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy } from './at.strategy';
import { PrismaService } from 'src/prisma.service';
import { RtStrategy } from './rt.strategy';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AtStrategy,
    RtStrategy,
    PrismaService,
    UserService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
