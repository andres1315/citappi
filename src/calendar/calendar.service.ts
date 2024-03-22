import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { UpdateCalendarDto } from './dto/update-calendar.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Calendar } from './entities/calendar.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CalendarService {
  constructor(
    @InjectRepository(Calendar)
    private readonly calendarRepository: Repository<Calendar>,

    private dataSource: DataSource,
  ) {}

  async create(createCalendarDto: CreateCalendarDto) {
    console.log(createCalendarDto);
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
    return await this.calendarRepository.find({
      where: {
        state: 1,
      },
      relations: {
        customer: true,
        employe: true,
        service: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} calendar`;
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
