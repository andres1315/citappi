import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DataSource, Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private dataSource: DataSource,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    try {
      await this.dataSource.manager.transaction(
        async (transactionRepository) => {
          await transactionRepository.save(Service, createServiceDto);
        },
      );
      return {
        ...createServiceDto,
      };
    } catch (e) {
      this.handleDBError(e, 'Ocurrio un errro creando el servicio');
    }
  }

  async findAll() {
    return await this.serviceRepository.find({
      where: {
        state: 1,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }

  private handleDBError(e: any, text?: string) {
    console.error(e);
    const errorMessage = text || 'An error occurred';
    throw new InternalServerErrorException(errorMessage);
  }
}
