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
exports.CustomersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const customer_entity_1 = require("./entities/customer.entity");
const typeorm_2 = require("@nestjs/typeorm");
let CustomersService = class CustomersService {
    constructor(customerRepository, dataSource) {
        this.customerRepository = customerRepository;
        this.dataSource = dataSource;
    }
    async create(createCustomerDto) {
        try {
            await this.dataSource.manager.transaction(async (transactionEntity) => {
                await transactionEntity.save(customer_entity_1.Customer, createCustomerDto);
            });
            return {
                ...createCustomerDto,
            };
        }
        catch (e) {
            this.handleDBError(e, 'Ha ocurrido un erroe creando evento  del calendario');
        }
    }
    async findAll(paginationDto) {
        const { limit = 10, page = 1 } = paginationDto;
        const [data, total] = await this.customerRepository.findAndCount({
            skip: page > 0 ? (page - 1) * limit : 0,
            take: limit,
        });
        return {
            data,
            total,
            page,
            limit,
        };
    }
    async filter(filterCustomerDto) {
        try {
            const { name } = filterCustomerDto;
            return await this.customerRepository.find({
                where: [
                    { firstName: (0, typeorm_1.ILike)(`%${name}%`), state: 1 },
                    { lastName: (0, typeorm_1.ILike)(`%${name}%`), state: 1 },
                ],
            });
        }
        catch (e) {
            this.handleDBError(e, 'Error buscando los clientes');
        }
    }
    findOne(id) {
        return `This action returns a #${id} customer`;
    }
    update(id, updateCustomerDto) {
        return `This action updates a #${id} customer`;
    }
    async remove(id) {
        await this.dataSource.manager.transaction(async (transaction) => {
            await transaction.delete(customer_entity_1.Customer, { state: 1 });
        });
    }
    async removeAll() {
        await this.dataSource.manager.transaction(async (transaction) => {
            await transaction.delete(customer_entity_1.Customer, { state: 1 });
        });
    }
    handleDBError(e, text) {
        console.error(e);
        const errorMessage = text || 'An error occurred';
        throw new common_1.InternalServerErrorException(errorMessage);
    }
};
exports.CustomersService = CustomersService;
exports.CustomersService = CustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(customer_entity_1.Customer)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.DataSource])
], CustomersService);
//# sourceMappingURL=customers.service.js.map