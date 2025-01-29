import { IncomesService } from './incomes.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
export declare class IncomesController {
    private readonly incomesService;
    constructor(incomesService: IncomesService);
    create(createIncomeDto: CreateIncomeDto): Promise<{
        description: string;
        value: number;
        third: number;
        typeTransaction: number;
        transactionId: number;
        userCreated: number;
        methodPayment: number;
    }>;
    findAll(): Promise<import("./entities/income.entity").Income[]>;
    findOne(id: string): string;
    update(id: string, updateIncomeDto: UpdateIncomeDto): string;
    remove(id: string): string;
}
