import { CalendarService } from './calendar.service';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { FilterEventsDto } from './dto/filter-calendar.dto';
export declare class CalendarController {
    private readonly calendarService;
    constructor(calendarService: CalendarService);
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
    findAll(filterEventsDto: FilterEventsDto): Promise<import("./entities/calendar.entity").Calendar[]>;
    findOne(id: string): Promise<import("./entities/calendar.entity").Calendar>;
    update(id: string, updateCalendarDto: UpdateCalendarDto): string;
    remove(id: string): string;
}
