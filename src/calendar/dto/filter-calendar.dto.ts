import { IsDate, IsOptional } from 'class-validator';

export class FilterEventsDto {
  @IsOptional()
  @IsDate()
  startDate: Date | string;

  @IsDate()
  @IsOptional()
  endDate: Date | string;
}
