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
      await this.calendarService.updatePayment(
        createIncomeDto.transactionId,
        createIncomeDto.value,
      );
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
      .leftJoinAndSelect('income.customer', 'customer')
      .leftJoinAndSelect('income.employe', 'employe')
      .getMany();
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
