import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DataSource, Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { FilterCustomerDto } from './dto/filter-customer.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class CustomersService {
    private readonly customerRepository;
    private dataSource;
    constructor(customerRepository: Repository<Customer>, dataSource: DataSource);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        firstName: string;
        lastName: string;
        phone: number;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Customer[];
        total: number;
        page: number;
        limit: number;
    }>;
    filter(filterCustomerDto: FilterCustomerDto): Promise<Customer[]>;
    findOne(id: number): string;
    update(id: number, updateCustomerDto: UpdateCustomerDto): string;
    remove(id: number): Promise<void>;
    removeAll(): Promise<void>;
    private handleDBError;
}
