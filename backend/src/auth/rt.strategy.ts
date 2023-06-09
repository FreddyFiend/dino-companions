import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt') {
  constructor() {
    super({
      /*  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), */
      jwtFromRequest: RtStrategy.extractJWT,
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_JWT,
      passReqToCallback: true,
    });
  }
  async validate(req: RequestType, payload: any) {
    return payload;
  }
  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'refreshToken' in req.cookies) {
      const refreshToken = req.cookies['refreshToken'];
      return refreshToken;
    }
    return null;
  }
}
