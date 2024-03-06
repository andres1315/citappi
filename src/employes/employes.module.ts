import { Module } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { EmployesController } from './employes.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Employe } from './entities/employe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Employe])],
  controllers: [EmployesController],
  providers: [EmployesService],
  exports: [EmployesService, TypeOrmModule],
})
export class EmployesModule {}
