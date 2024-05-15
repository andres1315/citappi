import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { RangeDateDto } from './dto/stats.dto';

import { IncomesService } from 'src/incomes/incomes.service';
import { ExpendituresService } from 'src/expenditures/expenditures.service';
import { addDay, dayEnd, dayStart, format } from '@formkit/tempo';
import { CalendarService } from 'src/calendar/calendar.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly incomeService: IncomesService,
    private readonly expenditureService: ExpendituresService,
    private readonly calendarService: CalendarService,
  ) {}

  async findAll(statsDto: RangeDateDto) {
    const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';

    const datesRange = {
      startDate: format(addDay(dayStart(statsDto.startDate)), formatDate, 'es'),
      endDate: format(addDay(dayEnd(statsDto.endDate)), formatDate, 'es'),
    };
    try {
      const [
        totalIncome,
        totalExpenditures,
        incomes,
        expenditure,
        qtyEvents,
        customerSchedule,
      ] = await Promise.all([
        this.incomeService.findAllActive(),
        this.expenditureService.findAllActive(),
        this.incomeService.findByDateAndSum(datesRange),
        this.expenditureService.findByDateAndSum(datesRange),
        this.calendarService.filterAndCout(datesRange),
        this.calendarService.customersToBeScheduled(),
      ]);

      return {
        incomes,
        expenditure,
        totalIncome,
        totalExpenditures,
        qtyEvents,
        customerSchedule,
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
