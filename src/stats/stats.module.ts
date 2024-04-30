import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatsController } from './stats.controller';
import { IncomesModule } from 'src/incomes/incomes.module';
import { ExpendituresModule } from 'src/expenditures/expenditures.module';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
  imports: [IncomesModule, ExpendituresModule],
})
export class StatsModule {}
