import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ExpendituresService {
  constructor(
    @InjectRepository(Expenditure)
    private readonly expenditureRepository: Repository<Expenditure>,
    private dataSource: DataSource,
  ) {}
  async create(createExpenditureDto: CreateExpenditureDto) {
    try {
      await this.dataSource.manager.transaction(async (transaction) => {
        await transaction.save(Expenditure, createExpenditureDto);
      });
    } catch (e) {
      this.handleDBError(e, 'Ocurrio un error inesperado creado el egreso');
    }
  }

  async findAll() {
    try {
      return await this.dataSource
        .getRepository(Expenditure)
        .createQueryBuilder('expenditure')
        .where({ state: 1 })
        .orderBy('expenditure.created_at', 'DESC')

        .leftJoinAndSelect('expenditure.customer', 'customer')
        .leftJoinAndSelect('expenditure.employe', 'employe')
        .getMany();
    } catch (e) {
      this.handleDBError(
        e,
        'Se presento un error al cargar la lista de egresos',
      );
    }
  }

  async findByDateAndSum(rangeDate: {
    startDate: Date | string;
    endDate: Date | string;
  }) {
    const expenditures = await this.dataSource
      .getRepository(Expenditure)
      .createQueryBuilder('expenditure')
      .select('SUM(expenditure.value)', 'sum')
      .where(
        'expenditure.created_at BETWEEN :startDate AND :endDate AND :state',
        {
          startDate: rangeDate.startDate,
          endDate: rangeDate.endDate,
          state: 1,
        },
      )

      .getRawOne();
    return expenditures.sum || 0;
  }

  async findAllActive() {
    const expenditures = await this.dataSource
      .getRepository(Expenditure)
      .createQueryBuilder('expenditure')
      .select('SUM(expenditure.value)', 'sum')
      .where('state= :state', {
        state: 1,
      })

      .getRawOne();
    return expenditures.sum || 0;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenditure`;
  }

  update(id: number, updateExpenditureDto: UpdateExpenditureDto) {
    return `This action updates a #${id} expenditure`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenditure`;
  }

  private handleDBError(e: any, text?: string) {
    console.error(e);
    const errorMessage = text || 'An error occurred';
    throw new InternalServerErrorException(errorMessage);
  }
}
