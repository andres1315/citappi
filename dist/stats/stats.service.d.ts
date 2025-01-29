import { RangeDateDto } from './dto/stats.dto';
import { IncomesService } from 'src/incomes/incomes.service';
import { ExpendituresService } from 'src/expenditures/expenditures.service';
import { CalendarService } from 'src/calendar/calendar.service';
export declare class StatsService {
    private readonly incomeService;
    private readonly expenditureService;
    private readonly calendarService;
    constructor(incomeService: IncomesService, expenditureService: ExpendituresService, calendarService: CalendarService);
    findAll(statsDto: RangeDateDto): Promise<{
        incomes: any;
        expenditure: any;
        totalIncome: any;
        totalExpenditures: any;
        qtyEvents: any;
        customerSchedule: any[];
    }>;
    findOne(id: number): string;
    remove(id: number): string;
    private handleDbError;
}
