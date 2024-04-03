import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarModule } from './calendar/calendar.module';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './config/env.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { EmployesModule } from './employes/employes.module';
import { ServicesModule } from './services/services.module';
import { IncomesModule } from './incomes/incomes.module';
import { ExpendituresModule } from './expenditures/expenditures.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRESDB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: true,
    }),
    CalendarModule,
    CustomersModule,
    EmployesModule,
    ServicesModule,
    IncomesModule,
    ExpendituresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
