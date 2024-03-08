import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DataSource, ILike, Like, Repository } from 'typeorm';

import { Customer } from './entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterCustomerDto } from './dto/filter-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    private dataSource: DataSource,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      await this.dataSource.manager.transaction(async (transactionEntity) => {
        await transactionEntity.save(Customer, createCustomerDto);
      });
      return {
        ...createCustomerDto,
      };
    } catch (e) {
      this.handleDBError(
        e,
        'Ha ocurrido un erroe creando evento  del calendario',
      );
    }
  }

  async findAll() {
    return await this.customerRepository.find({});
  }

  async filter(filterCustomerDto: FilterCustomerDto) {
    try {
      const { name } = filterCustomerDto;

      return await this.customerRepository.find({
        where: [
          { firstName: ILike(`%${name}%`), state: 1 },
          { lastName: ILike(`%${name}%`), state: 1 },
        ],
      });
    } catch (e) {
      this.handleDBError(e, 'Error buscando los clientes');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  async remove(id: number) {
    await this.dataSource.manager.transaction(async (transaction) => {
      await transaction.delete(Customer, { state: 1 });
    });
  }

  async removeAll() {
    await this.dataSource.manager.transaction(async (transaction) => {
      await transaction.delete(Customer, { state: 1 });
    });
  }

  private handleDBError(e: any, text?: string) {
    console.error(e);
    const errorMessage = text || 'An error occurred';
    throw new InternalServerErrorException(errorMessage);
  }
}
