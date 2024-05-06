import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { DataSource, Repository } from 'typeorm';
import { FilterEventsDto } from './dto/filter-calendar.dto';
import { addYear, dayEnd, format } from '@formkit/tempo';
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

  async findAll() {
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

    const eventsCalendar = await this.dataSource
      .getRepository(Calendar)
      .createQueryBuilder('calendar')
      .where(
        'calendar.start BETWEEN :startDate AND :endDate AND calendar.state = :state',
        {
          startDate: dateLastYear,
          endDate: currentDateCol,
          state: 1,
        },
      )
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
