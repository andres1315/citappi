import { Module } from '@nestjs/common';
import { ExpendituresService } from './expenditures.service';
import { ExpendituresController } from './expenditures.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenditure } from './entities/expenditure.entity';

@Module({
  controllers: [ExpendituresController],
  providers: [ExpendituresService],
  imports: [TypeOrmModule.forFeature([Expenditure])],
  exports: [ExpendituresService],
})
export class ExpendituresModule {}
