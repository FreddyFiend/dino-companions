import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request as RequestType } from 'express';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at') {
  constructor() {
    super({
      /*  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), */
      jwtFromRequest: ExtractJwt.fromExtractors([
        AtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_JWT,
    });
  }
  async validate(payload: any) {
    return { sub: payload.sub, email: payload.email };
  }
  private static extractJWT(req: RequestType): string | null {
    if (req.cookies && 'accessToken' in req.cookies) {
      return req.cookies.accessToken;
    }
    return null;
  }
}
