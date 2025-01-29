"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpendituresModule = void 0;
const common_1 = require("@nestjs/common");
const expenditures_service_1 = require("./expenditures.service");
const expenditures_controller_1 = require("./expenditures.controller");
const typeorm_1 = require("@nestjs/typeorm");
const expenditure_entity_1 = require("./entities/expenditure.entity");
let ExpendituresModule = class ExpendituresModule {
};
exports.ExpendituresModule = ExpendituresModule;
exports.ExpendituresModule = ExpendituresModule = __decorate([
    (0, common_1.Module)({
        controllers: [expenditures_controller_1.ExpendituresController],
        providers: [expenditures_service_1.ExpendituresService],
        imports: [typeorm_1.TypeOrmModule.forFeature([expenditure_entity_1.Expenditure])],
        exports: [expenditures_service_1.ExpendituresService],
    })
], ExpendituresModule);
//# sourceMappingURL=expenditures.module.js.map