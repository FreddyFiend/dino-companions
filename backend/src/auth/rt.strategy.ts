import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request as RequestType } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor() {
    super({
      /*  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), */
      jwtFromRequest: RtStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: jwtConstants.rtSecret,
      passReqToCallback: true,
    });
  }
  async validate(req: RequestType, payload: any) {
    return { payload };
  }
  private static extractJWT(req: RequestType): string | null {
    console.log(req.cookies);
    if (req.cookies && 'refreshToken' in req.cookies) {
      const refreshToken = req.cookies['refreshToken'];
      return refreshToken;
    }
    return null;
  }
}
