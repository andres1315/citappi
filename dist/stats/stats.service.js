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
exports.StatsService = void 0;
const common_1 = require("@nestjs/common");
const incomes_service_1 = require("../incomes/incomes.service");
const expenditures_service_1 = require("../expenditures/expenditures.service");
const tempo_1 = require("@formkit/tempo");
const calendar_service_1 = require("../calendar/calendar.service");
let StatsService = class StatsService {
    constructor(incomeService, expenditureService, calendarService) {
        this.incomeService = incomeService;
        this.expenditureService = expenditureService;
        this.calendarService = calendarService;
    }
    async findAll(statsDto) {
        const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';
        const datesRange = {
            startDate: (0, tempo_1.format)((0, tempo_1.addDay)((0, tempo_1.dayStart)(statsDto.startDate)), formatDate, 'es'),
            endDate: (0, tempo_1.format)((0, tempo_1.addDay)((0, tempo_1.dayEnd)(statsDto.endDate)), formatDate, 'es'),
        };
        try {
            const [totalIncome, totalExpenditures, incomes, expenditure, qtyEvents, customerSchedule,] = await Promise.all([
                this.incomeService.findAllActive(),
                this.expenditureService.findAllActive(),
                this.incomeService.findByDateAndSum(datesRange),
                this.expenditureService.findByDateAndSum(datesRange),
                this.calendarService.filterAndCout(datesRange),
                this.calendarService.customersToBeScheduled(),
            ]);
            return {
                incomes,
                expenditure,
                totalIncome,
                totalExpenditures,
                qtyEvents,
                customerSchedule,
            };
        }
        catch (e) {
            this.handleDbError(e, 'Ocurrio un error consultado los stats');
        }
    }
    findOne(id) {
        return `This action returns a #${id} stat`;
    }
    remove(id) {
        return `This action removes a #${id} stat`;
    }
    handleDbError(e, message) {
        const messageError = message || 'Ocurrio un error en stats';
        throw new common_1.InternalServerErrorException(messageError);
    }
};
exports.StatsService = StatsService;
exports.StatsService = StatsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [incomes_service_1.IncomesService,
        expenditures_service_1.ExpendituresService,
        calendar_service_1.CalendarService])
], StatsService);
//# sourceMappingURL=stats.service.js.map