import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Between, DataSource, Repository } from 'typeorm';
import { FilterEventsDto } from './dto/filter-calendar.dto';
import { subYears } from 'date-fns';

import { getCurrentDateInBogotaTimezone } from 'src/helpers/formatDateTimeZone';
@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,

    private dataSource: DataSource,
  ) {}

  async create(createCalendarDto: CreateCalendarDto) {
    try {
      await this.dataSource.manager.transaction(
        async (transactionRepository) => {
          await transactionRepository.save(Calendar, createCalendarDto);
        },
      );
      return {
        ...createCalendarDto,
      };
    } catch (e) {
      this.handleDBError(e, 'An error occurred while creating the calendar');
    }
  }

  async filter(filterEventDto: FilterEventsDto) {
    try {
      const eventCalendar = await this.dataSource
        .getRepository(CalendarService)
        .createQueryBuilder('calendar')
        .select('COUNT(calendar.id)', 'qtyEvents')
        .where(
          'calendar.created_at BETWEEN :startDate AND :endDate and :state',
          {
            state: 1,
            startDate: filterEventDto.startDate,
            endDate: filterEventDto.endDate,
          },
        )
        .getRawOne();
      return eventCalendar.qtyEvents || 0;
    } catch (e) {
      this.handleDBError(
        e,
        'Ocurrio un error filtrando los eventos del calendario',
      );
    }
  }

  async findAll() {
    const currentDateCol = getCurrentDateInBogotaTimezone(new Date());
    const dateLastYear = subYears(currentDateCol, 1);

    console.log({
      startdate: currentDateCol,
      lastdate: dateLastYear,
    });

    const eventsCalendar = await this.calendarRepository.find({
      where: {
        state: 1,
        start: Between(dateLastYear, currentDateCol),
      },
      relations: {
        customer: true,
        employe: true,
        service: true,
      },
    });

    return eventsCalendar;
  }

  async findOne(id: number) {
    return await this.dataSource.getRepository(Calendar).findOneBy({
      id,
    });
  }

  async updatePayment(id: number, valuePayment: number) {
    const event = await this.findOne(id);

    const updateEvent = await this.dataSource
      .createQueryBuilder()
      .update(Calendar)
      .set({
        payment: event.payment + valuePayment,
      })
      .where('id = :id', { id })
      .execute();
    return updateEvent;
  }

  update(id: number, updateCalendarDto: UpdateCalendarDto) {
    return `This action updates a #${id} calendar`;
  }

  remove(id: number) {
    return `This action removes a #${id} calendar`;
  }

  private handleDBError(e: any, text?: string) {
    console.error(e);
    const errorMessage = text || 'An error occurred';
    throw new InternalServerErrorException(errorMessage);
  }
}
