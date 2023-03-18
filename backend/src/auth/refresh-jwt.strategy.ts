import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request as RequestType } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      /*  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), */
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: any) {
    console.log(payload);
    return { sub: payload.sub, email: payload.email };
  }
  private static extractJWT(req: RequestType): string | null {
    console.log(req.cookies['token']);
    if (req.cookies && 'token' in req.cookies) {
      console.log('yes');
      return req.cookies['token'];
    }
    return null;
  }
}
