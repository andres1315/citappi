import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { Between, DataSource, Repository } from 'typeorm';

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

  async findAll() {
    const currentDate = new Date();
    const dateLastYear = new Date(
      new Date(currentDate).setFullYear(currentDate.getFullYear() - 1),
    );

    const qr1 = await this.calendarRepository.find({
      where: {
        state: 1,
        createdAt: Between(dateLastYear, currentDate),
      },
      relations: {
        customer: true,
        employe: true,
        service: true,
      },
    });

    return qr1;
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
