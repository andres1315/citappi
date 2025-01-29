import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { DataSource, Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { CalendarService } from 'src/calendar/calendar.service';
export declare class IncomesService {
    private readonly incomeRepository;
    private dataSource;
    private calendarService;
    constructor(incomeRepository: Repository<Income>, dataSource: DataSource, calendarService: CalendarService);
    create(createIncomeDto: CreateIncomeDto): Promise<{
        description: string;
        value: number;
        third: number;
        typeTransaction: number;
        transactionId: number;
        userCreated: number;
        methodPayment: number;
    }>;
    findAll(): Promise<Income[]>;
    findByDateAndSum(rangeDate: {
        startDate: Date | string;
        endDate: Date | string;
    }): Promise<any>;
    findAllActive(): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateIncomeDto: UpdateIncomeDto): string;
    remove(id: number): string;
    private handleDBError;
}
