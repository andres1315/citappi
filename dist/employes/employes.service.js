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
var EmployesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const employe_entity_1 = require("./entities/employe.entity");
const typeorm_2 = require("@nestjs/typeorm");
let EmployesService = EmployesService_1 = class EmployesService {
    constructor(employeRepository, dataSource) {
        this.employeRepository = employeRepository;
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(EmployesService_1.name);
    }
    async create(createEmployeDto) {
        try {
            await this.dataSource.manager.transaction(async (transactionEntity) => {
                await transactionEntity.save(employe_entity_1.Employe, createEmployeDto);
            });
            return {
                ...createEmployeDto,
            };
        }
        catch (e) {
            this.handleDBError(e, 'An error occurred while creating the employe');
        }
    }
    async findAll() {
        return await this.employeRepository.find({
            relations: {
                calendar: true,
            },
        });
    }
    async filter(filterEmployeDto) {
        const { name } = filterEmployeDto;
        return await this.dataSource
            .createQueryBuilder(employe_entity_1.Employe, 'employe')
            .where('UPPER(first_name) like UPPER(:name) or UPPER(last_name) like UPPER(:name)', {
            name: `%${name.toUpperCase()}%`,
        })
            .getMany();
    }
    findOne(id) {
        return `This action returns a #${id} employe`;
    }
    update(id, updateEmployeDto) {
        return `This action updates a #${id} employe`;
    }
    remove(id) {
        return `This action removes a #${id} employe`;
    }
    handleDBError(e, text) {
        console.error(e);
        this.logger.error(e);
        if (e.code === '23505')
            throw new common_1.BadRequestException(e.detail);
        const messageError = text || 'Error processing request';
        throw new common_1.InternalServerErrorException(messageError);
    }
};
exports.EmployesService = EmployesService;
exports.EmployesService = EmployesService = EmployesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(employe_entity_1.Employe)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], EmployesService);
//# sourceMappingURL=employes.service.js.map