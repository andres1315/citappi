"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const calendar_module_1 = require("./calendar/calendar.module");
const config_1 = require("@nestjs/config");
const env_config_1 = require("./config/env.config");
const typeorm_1 = require("@nestjs/typeorm");
const customers_module_1 = require("./customers/customers.module");
const employes_module_1 = require("./employes/employes.module");
const services_module_1 = require("./services/services.module");
const incomes_module_1 = require("./incomes/incomes.module");
const expenditures_module_1 = require("./expenditures/expenditures.module");
const stats_module_1 = require("./stats/stats.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [env_config_1.envConfig],
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.POSTGRESDB,
                autoLoadEntities: true,
                synchronize: true,
                ssl: true,
            }),
            calendar_module_1.CalendarModule,
            customers_module_1.CustomersModule,
            employes_module_1.EmployesModule,
            services_module_1.ServicesModule,
            incomes_module_1.IncomesModule,
            expenditures_module_1.ExpendituresModule,
            stats_module_1.StatsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map