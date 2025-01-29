import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FilterCustomerDto } from './dto/filter-customer.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
export declare class CustomersController {
    private readonly customersService;
    constructor(customersService: CustomersService);
    create(createCustomerDto: CreateCustomerDto): Promise<{
        firstName: string;
        lastName: string;
        phone: number;
    }>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: import("./entities/customer.entity").Customer[];
        total: number;
        page: number;
        limit: number;
    }>;
    filter(filterCustomerDto: FilterCustomerDto): Promise<import("./entities/customer.entity").Customer[]>;
    findOne(id: string): string;
    update(id: string, updateCustomerDto: UpdateCustomerDto): string;
    remove(id: string): Promise<void>;
}
