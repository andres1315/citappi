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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployesController = void 0;
const common_1 = require("@nestjs/common");
const employes_service_1 = require("./employes.service");
const create_employe_dto_1 = require("./dto/create-employe.dto");
const update_employe_dto_1 = require("./dto/update-employe.dto");
const filter_employe_dto_1 = require("./dto/filter-employe.dto");
let EmployesController = class EmployesController {
    constructor(employesService) {
        this.employesService = employesService;
    }
    create(createEmployeDto) {
        return this.employesService.create(createEmployeDto);
    }
    findAll() {
        return this.employesService.findAll();
    }
    filter(filterEmployeDto) {
        return this.employesService.filter(filterEmployeDto);
    }
    findOne(id) {
        return this.employesService.findOne(+id);
    }
    update(id, updateEmployeDto) {
        return this.employesService.update(+id, updateEmployeDto);
    }
    remove(id) {
        return this.employesService.remove(+id);
    }
};
exports.EmployesController = EmployesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employe_dto_1.CreateEmployeDto]),
    __metadata("design:returntype", void 0)
], EmployesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_employe_dto_1.FilterEmployeDto]),
    __metadata("design:returntype", void 0)
], EmployesController.prototype, "filter", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_employe_dto_1.UpdateEmployeDto]),
    __metadata("design:returntype", void 0)
], EmployesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployesController.prototype, "remove", null);
exports.EmployesController = EmployesController = __decorate([
    (0, common_1.Controller)('employes'),
    __metadata("design:paramtypes", [employes_service_1.EmployesService])
], EmployesController);
//# sourceMappingURL=employes.controller.js.map