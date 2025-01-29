import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { Calendar } from './entities/calendar.entity';
import { DataSource, Repository } from 'typeorm';
import { FilterEventsDto } from './dto/filter-calendar.dto';
export declare class CalendarService {
    private readonly calendarRepository;
    private dataSource;
    constructor(calendarRepository: Repository<Calendar>, dataSource: DataSource);
    create(createCalendarDto: CreateCalendarDto): Promise<{
        title: string;
        start: Date;
        end: Date;
        notes: string;
        customerId: number;
        employeId: number;
        serviceId: number;
        price: number;
    }>;
    filterAndCout(filterEventDto: FilterEventsDto): Promise<any>;
    customersToBeScheduled(): Promise<any[]>;
    findAll(filterEventsDto: FilterEventsDto): Promise<Calendar[]>;
    findOne(id: number): Promise<Calendar>;
    updatePayment(id: number, valuePayment: number): Promise<import("typeorm").UpdateResult>;
    update(id: number, updateCalendarDto: UpdateCalendarDto): string;
    remove(id: number): string;
    private handleDBError;
}
