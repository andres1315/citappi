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
exports.Income = void 0;
const customer_entity_1 = require("../../customers/entities/customer.entity");
const employe_entity_1 = require("../../employes/entities/employe.entity");
const typeorm_1 = require("typeorm");
let Income = class Income {
};
exports.Income = Income;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Income.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
        nullable: false,
    }),
    __metadata("design:type", String)
], Income.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Income.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Income.prototype, "third", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 1,
        name: 'type_transaction',
    }),
    __metadata("design:type", Number)
], Income.prototype, "typeTransaction", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        name: 'transaction_id',
    }),
    __metadata("design:type", Number)
], Income.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 1,
    }),
    __metadata("design:type", Number)
], Income.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        name: 'user_created',
    }),
    __metadata("design:type", Number)
], Income.prototype, "userCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 0,
        name: 'is_accounted',
    }),
    __metadata("design:type", Number)
], Income.prototype, "isAccounted", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        name: 'method_payment',
    }),
    __metadata("design:type", Number)
], Income.prototype, "methodPayment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Income.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Income.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'third' }),
    __metadata("design:type", customer_entity_1.Customer)
], Income.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employe_entity_1.Employe, (employe) => employe.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_created' }),
    __metadata("design:type", employe_entity_1.Employe)
], Income.prototype, "employe", void 0);
exports.Income = Income = __decorate([
    (0, typeorm_1.Entity)()
], Income);
//# sourceMappingURL=income.entity.js.map