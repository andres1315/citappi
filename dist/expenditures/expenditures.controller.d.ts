import { ExpendituresService } from './expenditures.service';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
export declare class ExpendituresController {
    private readonly expendituresService;
    constructor(expendituresService: ExpendituresService);
    create(createExpenditureDto: CreateExpenditureDto): Promise<void>;
    findAll(): Promise<import("./entities/expenditure.entity").Expenditure[]>;
    findOne(id: string): string;
    update(id: string, updateExpenditureDto: UpdateExpenditureDto): string;
    remove(id: string): string;
}
