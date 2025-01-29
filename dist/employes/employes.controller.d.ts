import { EmployesService } from './employes.service';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { FilterEmployeDto } from './dto/filter-employe.dto';
export declare class EmployesController {
    private readonly employesService;
    constructor(employesService: EmployesService);
    create(createEmployeDto: CreateEmployeDto): Promise<{
        firstName: string;
        lastName: string;
        phone: number;
        user: string;
        password: string;
    }>;
    findAll(): Promise<import("./entities/employe.entity").Employe[]>;
    filter(filterEmployeDto: FilterEmployeDto): Promise<import("./entities/employe.entity").Employe[]>;
    findOne(id: string): string;
    update(id: string, updateEmployeDto: UpdateEmployeDto): string;
    remove(id: string): string;
}
