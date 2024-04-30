import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { RangeDateDto } from './dto/stats.dto';

import { IncomesService } from 'src/incomes/incomes.service';
import { ExpendituresService } from 'src/expenditures/expenditures.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly incomeService: IncomesService,
    private readonly expenditureService: ExpendituresService,
  ) {}

  async findAll(statsDto: RangeDateDto) {
    const datesRange = {
      startDate: new Date(statsDto.startDate).setHours(0, 0, 0, 0),
      endDate: new Date(statsDto.endDate).setHours(23, 59, 59, 999),
    };
    try {
      const incomes = await this.incomeService.findByDateAndSum(datesRange);
      const expenditure =
        await this.expenditureService.findByDateAndSum(datesRange);
      return {
        incomes,
        expenditure,
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
    console.log(e);
    const messageError = message || 'Ocurrio un error en stats';
    throw new InternalServerErrorException(messageError);
  }
}
