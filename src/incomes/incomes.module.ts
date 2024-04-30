import { Module } from '@nestjs/common';
import { IncomesService } from './incomes.service';
import { IncomesController } from './incomes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { CalendarModule } from 'src/calendar/calendar.module';

@Module({
  controllers: [IncomesController],
  providers: [IncomesService],
  imports: [TypeOrmModule.forFeature([Income]), CalendarModule],
  exports: [IncomesService],
})
export class IncomesModule {}
