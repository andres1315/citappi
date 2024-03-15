import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCalendarDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsString()
  notes: string;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  customerId: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  employeId: number;

  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  serviceId: number;
}
