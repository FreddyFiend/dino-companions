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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const at_guard_1 = require("../auth/at.guard");
const add_role_dto_1 = require("./dto/add-role-dto");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
const user_decorator_1 = require("./decorators/user.decorator");
const user_data_dto_1 = require("./dto/user-data.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async findOne(user) {
        console.log();
        const _a = await this.userService.findOne({
            id: user.sub,
        }), { password, hashedRt } = _a, result = __rest(_a, ["password", "hashedRt"]);
        return result;
    }
    async findOneWithProducts(params) {
        console.log(params);
        const _a = await this.userService.findOneWithProducts({
            id: params.id,
        }), { password, hashedRt } = _a, result = __rest(_a, ["password", "hashedRt"]);
        return result;
    }
    createRole(req, data) {
        try {
            return this.userService.addRole(req, data);
        }
        catch (err) {
            throw new common_1.UnprocessableEntityException();
        }
    }
    async update(userData, user) {
        const _a = await this.userService.editUser(user.sub, userData), { password, hashedRt } = _a, result = __rest(_a, ["password", "hashedRt"]);
        return result;
    }
};
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('profile/:id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOneWithProducts", null);
__decorate([
    (0, common_1.Post)('role'),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('killer', 'money'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_role_dto_1.AddRoleDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "createRole", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto, user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map