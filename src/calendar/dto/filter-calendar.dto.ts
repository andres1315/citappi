import { IsDate, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class FilterEventsDto {
  @IsOptional()
  @IsDate()
  startDate?: Date | string;

  @IsDate()
  @IsOptional()
  endDate?: Date | string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  customerId?: number;
}
