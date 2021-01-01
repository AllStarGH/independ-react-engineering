"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
// 表名: t_user
// @Entity('t_user')
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn({ comment: '主键ID' })
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ comment: '用户名', length: 36 })
    ], User.prototype, "userName");
    __decorate([
        typeorm_1.Column({ comment: '邮箱地址', length: 60 })
    ], User.prototype, "userEmail");
    __decorate([
        typeorm_1.Column({ comment: '电话号码', length: 48 })
    ], User.prototype, "phoneNum");
    __decorate([
        typeorm_1.Column({ comment: '住址', length: 100 })
    ], User.prototype, "homeAddress");
    __decorate([
        typeorm_1.Column({ comment: '密码', length: 100 })
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column({ comment: '盐值', length: 100 })
    ], User.prototype, "salt");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
