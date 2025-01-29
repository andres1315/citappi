import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { DataSource, Repository } from 'typeorm';
import { Employe } from './entities/employe.entity';
import { FilterEmployeDto } from './dto/filter-employe.dto';
export declare class EmployesService {
    private readonly employeRepository;
    private dataSource;
    private readonly logger;
    constructor(employeRepository: Repository<Employe>, dataSource: DataSource);
    create(createEmployeDto: CreateEmployeDto): Promise<{
        firstName: string;
        lastName: string;
        phone: number;
        user: string;
        password: string;
    }>;
    findAll(): Promise<Employe[]>;
    filter(filterEmployeDto: FilterEmployeDto): Promise<Employe[]>;
    findOne(id: number): string;
    update(id: number, updateEmployeDto: UpdateEmployeDto): string;
    remove(id: number): string;
    private handleDBError;
}
