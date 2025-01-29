"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployesModule = void 0;
const common_1 = require("@nestjs/common");
const employes_service_1 = require("./employes.service");
const employes_controller_1 = require("./employes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const employe_entity_1 = require("./entities/employe.entity");
let EmployesModule = class EmployesModule {
};
exports.EmployesModule = EmployesModule;
exports.EmployesModule = EmployesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([employe_entity_1.Employe])],
        controllers: [employes_controller_1.EmployesController],
        providers: [employes_service_1.EmployesService],
        exports: [employes_service_1.EmployesService, typeorm_1.TypeOrmModule],
    })
], EmployesModule);
//# sourceMappingURL=employes.module.js.map