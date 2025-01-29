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
exports.ExpendituresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const expenditure_entity_1 = require("./entities/expenditure.entity");
const typeorm_2 = require("typeorm");
let ExpendituresService = class ExpendituresService {
    constructor(expenditureRepository, dataSource) {
        this.expenditureRepository = expenditureRepository;
        this.dataSource = dataSource;
    }
    async create(createExpenditureDto) {
        try {
            await this.dataSource.manager.transaction(async (transaction) => {
                await transaction.save(expenditure_entity_1.Expenditure, createExpenditureDto);
            });
        }
        catch (e) {
            this.handleDBError(e, 'Ocurrio un error inesperado creado el egreso');
        }
    }
    async findAll() {
        try {
            return await this.dataSource
                .getRepository(expenditure_entity_1.Expenditure)
                .createQueryBuilder('expenditure')
                .where({ state: 1 })
                .orderBy('expenditure.created_at', 'DESC')
                .leftJoinAndSelect('expenditure.customer', 'customer')
                .leftJoinAndSelect('expenditure.employe', 'employe')
                .getMany();
        }
        catch (e) {
            this.handleDBError(e, 'Se presento un error al cargar la lista de egresos');
        }
    }
    async findByDateAndSum(rangeDate) {
        const expenditures = await this.dataSource
            .getRepository(expenditure_entity_1.Expenditure)
            .createQueryBuilder('expenditure')
            .select('SUM(expenditure.value)', 'sum')
            .where('expenditure.created_at BETWEEN :startDate AND :endDate AND :state', {
            startDate: rangeDate.startDate,
            endDate: rangeDate.endDate,
            state: 1,
        })
            .getRawOne();
        return expenditures.sum || 0;
    }
    async findAllActive() {
        const expenditures = await this.dataSource
            .getRepository(expenditure_entity_1.Expenditure)
            .createQueryBuilder('expenditure')
            .select('SUM(expenditure.value)', 'sum')
            .where('state= :state', {
            state: 1,
        })
            .getRawOne();
        return expenditures.sum || 0;
    }
    findOne(id) {
        return `This action returns a #${id} expenditure`;
    }
    update(id, updateExpenditureDto) {
        return `This action updates a #${id} expenditure`;
    }
    remove(id) {
        return `This action removes a #${id} expenditure`;
    }
    handleDBError(e, text) {
        console.error(e);
        const errorMessage = text || 'An error occurred';
        throw new common_1.InternalServerErrorException(errorMessage);
    }
};
exports.ExpendituresService = ExpendituresService;
exports.ExpendituresService = ExpendituresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(expenditure_entity_1.Expenditure)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], ExpendituresService);
//# sourceMappingURL=expenditures.service.js.map