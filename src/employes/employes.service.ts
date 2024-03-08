import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { DataSource, Repository } from 'typeorm';
import { Employe } from './entities/employe.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployesService {
  private readonly logger = new Logger(EmployesService.name);
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepository: Repository<Employe>,
    private dataSource: DataSource,
  ) {}

  async create(createEmployeDto: CreateEmployeDto) {
    try {
      await this.dataSource.manager.transaction(async (transactionEntity) => {
        await transactionEntity.save(Employe, createEmployeDto);
      });
      return {
        ...createEmployeDto,
      };
    } catch (e) {
      this.handleDBError(e, 'An error occurred while creating the employe');
    }
  }

  async findAll() {
    return await this.employeRepository.find({
      relations: {
        calendar: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} employe`;
  }

  update(id: number, updateEmployeDto: UpdateEmployeDto) {
    return `This action updates a #${id} employe`;
  }

  remove(id: number) {
    return `This action removes a #${id} employe`;
  }

  private handleDBError(e: any, text: string) {
    console.error(e);
    this.logger.error(e);
    if (e.code === '23505') throw new BadRequestException(e.detail);
    const messageError = text || 'Error processing request';
    throw new InternalServerErrorException(messageError);
  }
}
