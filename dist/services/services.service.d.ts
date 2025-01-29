import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DataSource, Repository } from 'typeorm';
import { Service } from './entities/service.entity';
export declare class ServicesService {
    private readonly serviceRepository;
    private dataSource;
    constructor(serviceRepository: Repository<Service>, dataSource: DataSource);
    create(createServiceDto: CreateServiceDto): Promise<{
        service: string;
        time: number;
        isMounting: boolean;
    }>;
    findAll(): Promise<Service[]>;
    findOne(id: number): string;
    update(id: number, updateServiceDto: UpdateServiceDto): string;
    remove(id: number): string;
    private handleDBError;
}
