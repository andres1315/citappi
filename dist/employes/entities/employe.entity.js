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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employe = void 0;
const calendar_entity_1 = require("../../calendar/entities/calendar.entity");
const income_entity_1 = require("../../incomes/entities/income.entity");
const typeorm_1 = require("typeorm");
let Employe = class Employe {
};
exports.Employe = Employe;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Employe.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 100,
        name: 'first_name',
    }),
    __metadata("design:type", String)
], Employe.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 100,
        name: 'last_name',
    }),
    __metadata("design:type", String)
], Employe.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 1,
    }),
    __metadata("design:type", Number)
], Employe.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'float',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Employe.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 100,
        unique: true,
    }),
    __metadata("design:type", String)
], Employe.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
        length: 100,
    }),
    __metadata("design:type", String)
], Employe.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => calendar_entity_1.Calendar, (calendar) => calendar.employe),
    __metadata("design:type", Array)
], Employe.prototype, "calendar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Employe.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Employe.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => income_entity_1.Income, (income) => income.userCreated),
    __metadata("design:type", Array)
], Employe.prototype, "incomes", void 0);
exports.Employe = Employe = __decorate([
    (0, typeorm_1.Entity)()
], Employe);
//# sourceMappingURL=employe.entity.js.map