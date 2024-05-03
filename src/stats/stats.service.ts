import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { RangeDateDto } from './dto/stats.dto';

import { IncomesService } from 'src/incomes/incomes.service';
import { ExpendituresService } from 'src/expenditures/expenditures.service';
import { endOfDay, startOfDay, toDate } from 'date-fns';
import { getCurrentDateInBogotaTimezone } from 'src/helpers/formatDateTimeZone';
import { toZonedTime } from 'date-fns-tz';
import { addDay, dayEnd, dayStart, format } from '@formkit/tempo';

@Injectable()
export class StatsService {
  constructor(
    private readonly incomeService: IncomesService,
    private readonly expenditureService: ExpendituresService,
  ) {}

  async findAll(statsDto: RangeDateDto) {
    console.log(statsDto);
    const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';
    //format(t, "YYYY-MM-DDTHH:mm:ssZ", l)
    /* const datesRange = {
      startDate: new Date(statsDto.startDate),
      endDate: getCurrentDateInBogotaTimezone(
        endOfDay(toZonedTime(statsDto.endDate, 'America/Bogota')),
      ),
    }; */

    const datesRange = {
      startDate: format(addDay(dayStart(statsDto.startDate)), formatDate, 'es'),
      endDate: format(addDay(dayEnd(statsDto.endDate)), formatDate, 'en'),
    };

    console.log(datesRange);
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
