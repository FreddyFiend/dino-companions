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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const product_service_1 = require("./product.service");
const update_product_dto_1 = require("./dto/update-product.dto");
const user_decorator_1 = require("../user/decorators/user.decorator");
const at_guard_1 = require("../auth/at.guard");
const user_data_dto_1 = require("../user/dto/user-data.dto");
const create_review_dto_1 = require("./dto/create-review.dto");
const applyUser_guard_1 = require("../auth/applyUser.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    create(file, productData, user) {
        const newData = JSON.parse(productData.data);
        return this.productService.create(newData, file, user);
    }
    addReview(review, user) {
        return this.productService.createReview(review, user.sub);
    }
    async findAll(query) {
        const products = await this.productService.findAll(query);
        if (products && products[1].length) {
            const productsWithoutDeleteUrl = products[1].map((_a) => {
                var { imageDeleteUrl } = _a, keptAttrs = __rest(_a, ["imageDeleteUrl"]);
                return keptAttrs;
            });
            return [products[0], productsWithoutDeleteUrl];
        }
    }
    findOne(id, userData) {
        return this.productService.findOne(id, (userData === null || userData === void 0 ? void 0 : userData.sub) || '');
    }
    update(id, updateProductDto) {
        return this.productService.update(+id, updateProductDto);
    }
    remove(id) {
        return this.productService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1024 * 1024 * 5 }),
        ],
    }))),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('review'),
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __param(1, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_review_dto_1.CreateReviewDto,
        user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addReview", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(applyUser_guard_1.ApplyUser),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, user_decorator_1.UserData)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_data_dto_1.UserDataDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(at_guard_1.AtGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "remove", null);
ProductController = __decorate([
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map