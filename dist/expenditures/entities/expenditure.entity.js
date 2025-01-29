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
exports.Expenditure = void 0;
const customer_entity_1 = require("../../customers/entities/customer.entity");
const employe_entity_1 = require("../../employes/entities/employe.entity");
const typeorm_1 = require("typeorm");
let Expenditure = class Expenditure {
};
exports.Expenditure = Expenditure;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Expenditure.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        nullable: false,
    }),
    __metadata("design:type", String)
], Expenditure.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "third", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        default: 1,
        name: 'type_transaction',
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "typeTransaction", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        name: 'transaction_id',
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "transactionId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        default: 1,
        nullable: false,
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: false,
        name: 'user_created',
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "userCreated", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        nullable: true,
        name: 'method_payment',
        default: 1,
    }),
    __metadata("design:type", Number)
], Expenditure.prototype, "methodPayment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamptz',
        name: 'created_at',
    }),
    __metadata("design:type", Date)
], Expenditure.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamptz',
        name: 'updated_at',
    }),
    __metadata("design:type", Date)
], Expenditure.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (customer) => customer.id),
    (0, typeorm_1.JoinColumn)({ name: 'third' }),
    __metadata("design:type", customer_entity_1.Customer)
], Expenditure.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employe_entity_1.Employe, (employe) => employe.id),
    (0, typeorm_1.JoinColumn)({ name: 'user_created' }),
    __metadata("design:type", employe_entity_1.Employe)
], Expenditure.prototype, "employe", void 0);
exports.Expenditure = Expenditure = __decorate([
    (0, typeorm_1.Entity)()
], Expenditure);
//# sourceMappingURL=expenditure.entity.js.map