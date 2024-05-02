import { IsDate } from 'class-validator';

export class RangeDateDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}
