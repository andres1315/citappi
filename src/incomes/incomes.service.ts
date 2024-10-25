import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { DataSource, Repository } from 'typeorm';
import { Income } from './entities/income.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CalendarService } from 'src/calendar/calendar.service';

@Injectable()
export class IncomesService {
  constructor(
    @InjectRepository(Income)
    private readonly incomeRepository: Repository<Income>,
    private dataSource: DataSource,
    private calendarService: CalendarService,
  ) {}

  async create(createIncomeDto: CreateIncomeDto) {
    try {
      await this.dataSource.manager.transaction(
        async (transactionRepository) => {
          await transactionRepository.save(Income, createIncomeDto);
        },
      );
      if (createIncomeDto.transactionId != null) {
        await this.calendarService.updatePayment(
          createIncomeDto.transactionId,
          createIncomeDto.value,
        );
      }
      return {
        ...createIncomeDto,
      };
    } catch (e) {
      this.handleDBError(e, 'An error occurred while creating the calendar');
    }
  }

  async findAll() {
    return await this.dataSource
      .getRepository(Income)
      .createQueryBuilder('income')
      .where({ state: 1 })
      .orderBy('income.created_at', 'DESC')
      .leftJoinAndSelect('income.customer', 'customer')
      .leftJoinAndSelect('income.employe', 'employe')
      .getMany();
  }

  async findByDateAndSum(rangeDate: {
    startDate: Date | string;
    endDate: Date | string;
  }) {
    const incomes = await this.dataSource
      .getRepository(Income)
      .createQueryBuilder('income')
      .select('SUM(income.value)', 'sum')
      .where(
        'income.created_at BETWEEN :startDate AND :endDate AND state = :state',
        {
          startDate: rangeDate.startDate,
          endDate: rangeDate.endDate,
          state: 1,
        },
      )

      .getRawOne();

    return incomes.sum || 0;
  }

  async findAllActive() {
    const incomes = await this.dataSource
      .getRepository(Income)
      .createQueryBuilder('income')
      .select('SUM(income.value)', 'sum')
      .where('state = :state', {
        state: 1,
      })

      .getRawOne();

    return incomes.sum || 0;
  }

  findOne(id: number) {
    return `This action returns a #${id} income`;
  }

  update(id: number, updateIncomeDto: UpdateIncomeDto) {
    return `This action updates a #${id} income`;
  }

  remove(id: number) {
    return `This action removes a #${id} income`;
  }

  private handleDBError(e: any, text?: string) {
    console.error(e);
    const errorMessage = text || 'An error occurred';
    throw new InternalServerErrorException(errorMessage);
  }
}
