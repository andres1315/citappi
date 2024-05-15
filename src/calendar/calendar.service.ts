import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { DataSource, Repository } from 'typeorm';
import { FilterEventsDto } from './dto/filter-calendar.dto';
import { addMonth, addYear, dayEnd, diffDays, format } from '@formkit/tempo';
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

  async filterAndCout(filterEventDto: FilterEventsDto) {
    try {
      const eventCalendar = await this.dataSource
        .getRepository(Calendar)
        .createQueryBuilder('calendar')
        .select('COUNT(calendar.id)', 'qtyEvents')
        .where('calendar.start BETWEEN :startDate AND :endDate and :state', {
          state: 1,
          startDate: filterEventDto.startDate,
          endDate: filterEventDto.endDate,
        })
        .getRawOne();
      return eventCalendar.qtyEvents || 0;
    } catch (e) {
      this.handleDBError(
        e,
        'Ocurrio un error filtrando los eventos del calendario',
      );
    }
  }

  async customersToBeScheduled() {
    const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';
    const date = dayEnd(new Date());
    const currentDateCol = format({
      date,
      format: formatDate,
      tz: 'America/Bogota',
    });

    const dateMinusMonth = addMonth(date, -2);
    const dateLastTwoMonth = format({
      date: dateMinusMonth,
      format: formatDate,
      tz: 'America/Bogota',
    });

    const query = await this.dataSource
      .getRepository(Calendar)
      .createQueryBuilder('calendar')
      .where(
        'calendar.start BETWEEN :startDate AND :endDate AND calendar.state = :state',
        {
          startDate: dateLastTwoMonth,
          endDate: currentDateCol,
          state: 1,
        },
      )
      .leftJoinAndSelect('calendar.customer', 'customer')
      .orderBy('calendar.start', 'DESC')
      .getMany();

    if (query.length) {
      // filter customer where last schedule
      const lastSchedule = [];
      for (const cita of query) {
        const existOnList = lastSchedule.find(
          (e) => e.customerId == cita.customerId,
        );
        if (!existOnList) lastSchedule.push(cita);
      }
      const filterCustomerNeedSchedule = lastSchedule.filter((customer) => {
        const currentDay = format(date, 'YYYY-MM-DD', 'es');
        const dateLastSchedule = format(customer.start, 'YYYY-MM-DD', 'es');
        const qtyDaysDiff = diffDays(currentDay, dateLastSchedule);
        console.log(qtyDaysDiff);
        const maxDayWithoutSchedule = 15;
        if (qtyDaysDiff > maxDayWithoutSchedule) return customer;
      });
      return filterCustomerNeedSchedule;
    } else {
      return [];
    }
  }

  async findAll(filterEventsDto: FilterEventsDto) {
    const { customerId } = filterEventsDto;

    const formatDate = 'YYYY-MM-DDTHH:mm:ssZ';
    const date = dayEnd(new Date());
    const currentDateCol = format({
      date,
      format: formatDate,
      tz: 'America/Bogota',
    });
    const dateMinusYear = addYear(date, -1);
    const dateLastYear = format({
      date: dateMinusYear,
      format: formatDate,
      tz: 'America/Bogota',
    });

    const query = this.dataSource
      .getRepository(Calendar)
      .createQueryBuilder('calendar')
      .where(
        'calendar.start BETWEEN :startDate AND :endDate AND calendar.state = :state',
        {
          startDate: dateLastYear,
          endDate: currentDateCol,
          state: 1,
        },
      );
    if (customerId)
      query.andWhere('calendar.customerId = :customerId', { customerId });
    const eventsCalendar = await query
      .leftJoinAndSelect('calendar.customer', 'customer')
      .leftJoinAndSelect('calendar.employe', 'employe')
      .leftJoinAndSelect('calendar.service', 'service')
      .getMany();

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
