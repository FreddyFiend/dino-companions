"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const dist_1 = require("@nestjs/passport/dist");
const user_module_1 = require("../user/user.module");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const local_strategy_1 = require("./local.strategy");
const jwt_1 = require("@nestjs/jwt");
const at_strategy_1 = require("./at.strategy");
const prisma_service_1 = require("../prisma.service");
const rt_strategy_1 = require("./rt.strategy");
const user_service_1 = require("../user/user.service");
const applyUser_guard_1 = require("./applyUser.guard");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, dist_1.PassportModule, jwt_1.JwtModule.register({})],
        controllers: [auth_controller_1.AuthController],
        providers: [
            applyUser_guard_1.ApplyUser,
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            at_strategy_1.AtStrategy,
            rt_strategy_1.RtStrategy,
            prisma_service_1.PrismaService,
            user_service_1.UserService,
        ],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map