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
exports.IncomesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const income_entity_1 = require("./entities/income.entity");
const typeorm_2 = require("@nestjs/typeorm");
const calendar_service_1 = require("../calendar/calendar.service");
let IncomesService = class IncomesService {
    constructor(incomeRepository, dataSource, calendarService) {
        this.incomeRepository = incomeRepository;
        this.dataSource = dataSource;
        this.calendarService = calendarService;
    }
    async create(createIncomeDto) {
        try {
            await this.dataSource.manager.transaction(async (transactionRepository) => {
                await transactionRepository.save(income_entity_1.Income, createIncomeDto);
            });
            if (createIncomeDto.transactionId != null) {
                await this.calendarService.updatePayment(createIncomeDto.transactionId, createIncomeDto.value);
            }
            return {
                ...createIncomeDto,
            };
        }
        catch (e) {
            this.handleDBError(e, 'An error occurred while creating the calendar');
        }
    }
    async findAll() {
        return await this.dataSource
            .getRepository(income_entity_1.Income)
            .createQueryBuilder('income')
            .where({ state: 1 })
            .orderBy('income.created_at', 'DESC')
            .leftJoinAndSelect('income.customer', 'customer')
            .leftJoinAndSelect('income.employe', 'employe')
            .getMany();
    }
    async findByDateAndSum(rangeDate) {
        const incomes = await this.dataSource
            .getRepository(income_entity_1.Income)
            .createQueryBuilder('income')
            .select('SUM(income.value)', 'sum')
            .where('income.created_at BETWEEN :startDate AND :endDate AND state = :state', {
            startDate: rangeDate.startDate,
            endDate: rangeDate.endDate,
            state: 1,
        })
            .getRawOne();
        return incomes.sum || 0;
    }
    async findAllActive() {
        const incomes = await this.dataSource
            .getRepository(income_entity_1.Income)
            .createQueryBuilder('income')
            .select('SUM(income.value)', 'sum')
            .where('state = :state', {
            state: 1,
        })
            .getRawOne();
        return incomes.sum || 0;
    }
    findOne(id) {
        return `This action returns a #${id} income`;
    }
    update(id, updateIncomeDto) {
        return `This action updates a #${id} income`;
    }
    remove(id) {
        return `This action removes a #${id} income`;
    }
    handleDBError(e, text) {
        console.error(e);
        const errorMessage = text || 'An error occurred';
        throw new common_1.InternalServerErrorException(errorMessage);
    }
};
exports.IncomesService = IncomesService;
exports.IncomesService = IncomesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(income_entity_1.Income)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource,
        calendar_service_1.CalendarService])
], IncomesService);
//# sourceMappingURL=incomes.service.js.map