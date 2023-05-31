"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AtStrategy_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const passport_1 = require("@nestjs/passport");
const common_1 = require("@nestjs/common");
let AtStrategy = AtStrategy_1 = class AtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'at') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                AtStrategy_1.extractJWT,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_JWT,
        });
    }
    async validate(payload) {
        return { sub: payload.sub, email: payload.email };
    }
    static extractJWT(req) {
        if (req.cookies && 'accessToken' in req.cookies) {
            return req.cookies.accessToken;
        }
        return null;
    }
};
AtStrategy = AtStrategy_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AtStrategy);
exports.AtStrategy = AtStrategy;
//# sourceMappingURL=at.strategy.js.map