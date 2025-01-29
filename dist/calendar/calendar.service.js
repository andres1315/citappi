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
exports.CalendarService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const calendar_entity_1 = require("./entities/calendar.entity");
const typeorm_2 = require("typeorm");
const tempo_1 = require("@formkit/tempo");
let CalendarService = class CalendarService {
    constructor(calendarRepository, dataSource) {
        this.calendarRepository = calendarRepository;
        this.dataSource = dataSource;
    }
    async create(createCalendarDto) {
        try {
            await this.dataSource.manager.transaction(async (transactionRepository) => {
                await transactionRepository.save(calendar_entity_1.Calendar, createCalendarDto);
            });
            return {
                ...createCalendarDto,
            };
        }
        catch (e) {
            this.handleDBError(e, 'An error occurred while creating the calendar');
        }
    }
    async filterAndCout(filterEventDto) {
        try {
            const eventCalendar = await this.dataSource
                .getRepository(calendar_entity_1.Calendar)
                .createQueryBuilder('calendar')
                .select('COUNT(calendar.id)', 'qtyEvents')
                .where('calendar.start BETWEEN :startDate AND :endDate and :state', {
                state: 1,
                startDate: filterEventDto.startDate,
                endDate: filterEventDto.endDate,
            })
                .getRawOne();
            return eventCalendar.qtyEvents || 0;
        }
        catch (e) {
            this.handleDBError(e, 'Ocurrio un error filtrando los eventos del calendario');
        }
    }
    async customersToBeScheduled() {
        const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';
        const date = (0, tempo_1.dayEnd)(new Date());
        const currentDateCol = (0, tempo_1.format)({
            date,
            format: formatDate,
            tz: 'America/Bogota',
        });
        const dateMinusMonth = (0, tempo_1.addMonth)(date, -2);
        const dateLastTwoMonth = (0, tempo_1.format)({
            date: dateMinusMonth,
            format: formatDate,
            tz: 'America/Bogota',
        });
        const query = await this.dataSource
            .getRepository(calendar_entity_1.Calendar)
            .createQueryBuilder('calendar')
            .where('calendar.start BETWEEN :startDate AND :endDate AND calendar.state = :state', {
            startDate: dateLastTwoMonth,
            endDate: currentDateCol,
            state: 1,
        })
            .leftJoinAndSelect('calendar.customer', 'customer')
            .orderBy('calendar.start', 'DESC')
            .getMany();
        if (query.length) {
            const lastSchedule = [];
            for (const cita of query) {
                const existOnList = lastSchedule.find((e) => e.customerId == cita.customerId);
                if (!existOnList)
                    lastSchedule.push(cita);
            }
            const filterCustomerNeedSchedule = lastSchedule.filter((customer) => {
                const currentDay = (0, tempo_1.format)(date, 'YYYY-MM-DD', 'es');
                const dateLastSchedule = (0, tempo_1.format)(customer.start, 'YYYY-MM-DD', 'es');
                const qtyDaysDiff = (0, tempo_1.diffDays)(currentDay, dateLastSchedule);
                console.log(qtyDaysDiff);
                const maxDayWithoutSchedule = 15;
                if (qtyDaysDiff > maxDayWithoutSchedule)
                    return customer;
            });
            return filterCustomerNeedSchedule;
        }
        else {
            return [];
        }
    }
    async findAll(filterEventsDto) {
        const { customerId } = filterEventsDto;
        const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';
        const date = (0, tempo_1.dayEnd)(new Date());
        const currentDateCol = (0, tempo_1.format)({
            date,
            format: formatDate,
            tz: 'America/Bogota',
        });
        const dateMinusYear = (0, tempo_1.addYear)(date, -1);
        const dateLastYear = (0, tempo_1.format)({
            date: dateMinusYear,
            format: formatDate,
            tz: 'America/Bogota',
        });
        const query = this.dataSource
            .getRepository(calendar_entity_1.Calendar)
            .createQueryBuilder('calendar')
            .where('calendar.start BETWEEN :startDate AND :endDate AND calendar.state = :state', {
            startDate: dateLastYear,
            endDate: currentDateCol,
            state: 1,
        });
        if (customerId)
            query.andWhere('calendar.customerId = :customerId', { customerId });
        const eventsCalendar = await query
            .leftJoinAndSelect('calendar.customer', 'customer')
            .leftJoinAndSelect('calendar.employe', 'employe')
            .leftJoinAndSelect('calendar.service', 'service')
            .getMany();
        return eventsCalendar;
    }
    async findOne(id) {
        return await this.dataSource.getRepository(calendar_entity_1.Calendar).findOneBy({
            id,
        });
    }
    async updatePayment(id, valuePayment) {
        const event = await this.findOne(id);
        const updateEvent = await this.dataSource
            .createQueryBuilder()
            .update(calendar_entity_1.Calendar)
            .set({
            payment: event.payment + valuePayment,
        })
            .where('id = :id', { id })
            .execute();
        return updateEvent;
    }
    update(id, updateCalendarDto) {
        return `This action updates a #${id} calendar`;
    }
    remove(id) {
        return `This action removes a #${id} calendar`;
    }
    handleDBError(e, text) {
        console.error(e);
        const errorMessage = text || 'An error occurred';
        throw new common_1.InternalServerErrorException(errorMessage);
    }
};
exports.CalendarService = CalendarService;
exports.CalendarService = CalendarService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(calendar_entity_1.Calendar)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], CalendarService);
//# sourceMappingURL=calendar.service.js.map