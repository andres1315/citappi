import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { Expenditure } from './entities/expenditure.entity';
import { DataSource, Repository } from 'typeorm';
export declare class ExpendituresService {
    private readonly expenditureRepository;
    private dataSource;
    constructor(expenditureRepository: Repository<Expenditure>, dataSource: DataSource);
    create(createExpenditureDto: CreateExpenditureDto): Promise<void>;
    findAll(): Promise<Expenditure[]>;
    findByDateAndSum(rangeDate: {
        startDate: Date | string;
        endDate: Date | string;
    }): Promise<any>;
    findAllActive(): Promise<any>;
    findOne(id: number): string;
    update(id: number, updateExpenditureDto: UpdateExpenditureDto): string;
    remove(id: number): string;
    private handleDBError;
}
