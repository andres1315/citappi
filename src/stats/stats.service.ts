import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { RangeDateDto } from './dto/stats.dto';

import { IncomesService } from 'src/incomes/incomes.service';
import { ExpendituresService } from 'src/expenditures/expenditures.service';
import { toDate } from 'date-fns';

@Injectable()
export class StatsService {
  constructor(
    private readonly incomeService: IncomesService,
    private readonly expenditureService: ExpendituresService,
  ) {}

  async findAll(statsDto: RangeDateDto) {
    const datesRange = {
      startDate: toDate(new Date(statsDto.startDate).setHours(0, 0, 0, 0)),
      endDate: toDate(new Date(statsDto.endDate).setHours(23, 59, 59, 999)),
    };
    try {
      const [totalIncome, totalExpenditures, incomes, expenditure] =
        await Promise.all([
          this.incomeService.findAllActive(),
          this.expenditureService.findAllActive(),
          this.incomeService.findByDateAndSum(datesRange),
          this.expenditureService.findByDateAndSum(datesRange),
        ]);
      return {
        incomes,
        expenditure,
        totalIncome,
        totalExpenditures,
      };
    } catch (e) {
      this.handleDbError(e, 'Ocurrio un error consultado los stats');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} stat`;
  }

  remove(id: number) {
    return `This action removes a #${id} stat`;
  }

  private handleDbError(e: Error, message: string) {
    const messageError = message || 'Ocurrio un error en stats';
    throw new InternalServerErrorException(messageError);
  }
}
