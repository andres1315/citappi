import { IsDate, IsOptional } from 'class-validator';

export class FilterEventsDto {
  @IsOptional()
  @IsDate()
  startDate: Date;

  @IsDate()
  @IsOptional()
  endDate: Date;
}
