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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const argon = require("argon2");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(prisma, userService, jwtService) {
        this.prisma = prisma;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.userService.findOne({ email });
        if (user) {
            console.log(user.password);
            const passwordMatches = await argon.verify(user.password, pass);
            if (passwordMatches) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
        }
        return null;
    }
    async setTokensToCookie(res, access_token, refresh_token) {
        res.cookie('accessToken', access_token, {
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
        });
        res.cookie('refreshToken', refresh_token, {
            sameSite: 'strict',
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
        });
    }
    async login(user, res) {
        const payload = { email: user.email, sub: user.id };
        const { access_token, refresh_token } = await this.getTokens(user.id, user.email);
        await this.updateRtHash(user.id, refresh_token);
        await this.setTokensToCookie(res, access_token, refresh_token);
        return { access_token, refresh_token };
    }
    logOut(user) {
        this.prisma.user.updateMany({
            where: {
                id: user.sub,
                hashedRt: {
                    not: null,
                },
            },
            data: {
                hashedRt: null,
            },
        });
    }
    async refreshTokens(userId, rt, res) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!user || !user.hashedRt)
            throw new common_1.ForbiddenException("Access Denied hash don't exists");
        const rtMatches = await argon.verify(user.hashedRt, rt);
        if (!rtMatches)
            throw new common_1.ForbiddenException("Access Denied hash didn't match");
        const tokens = await this.getTokens(user.id, user.email);
        await this.setTokensToCookie(res, tokens.access_token, tokens.refresh_token);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hash = await argon.hash(rt);
        await this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRt: hash,
            },
        });
    }
    async createUser(data, res) {
        const { password } = data;
        const hashedPassword = await argon.hash(password);
        const newUser = await this.prisma.user.create({
            data: { name: data.name, email: data.email, password: hashedPassword },
        });
        const tokens = await this.getTokens(newUser.id, newUser.email);
        await this.updateRtHash(newUser.id, tokens.refresh_token);
        this.setTokensToCookie(res, tokens.access_token, tokens.refresh_token);
        return {
            user: {
                name: newUser.name,
                email: newUser.email,
                id: newUser.id,
            },
        };
    }
    async getTokens(userId, email) {
        const jwtPayload = {
            sub: userId,
            email: email,
        };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.ACCESS_JWT,
                expiresIn: '15m',
            }),
            this.jwtService.signAsync(jwtPayload, {
                secret: process.env.REFRESH_JWT,
                expiresIn: '7d',
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)({}),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map