import { StatsService } from './stats.service';
import { RangeDateDto } from './dto/stats.dto';
export declare class StatsController {
    private readonly statsService;
    constructor(statsService: StatsService);
    findAll(statsDto: RangeDateDto): Promise<{
        incomes: any;
        expenditure: any;
        totalIncome: any;
        totalExpenditures: any;
        qtyEvents: any;
        customerSchedule: any[];
    }>;
    findOne(id: string): string;
    remove(id: string): string;
}
