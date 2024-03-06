import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateEmployeDto {
  @IsString()
  @MinLength(5)
  firstName: string;

  @IsString()
  @MinLength(5)
  lastName: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  phone: number;

  @IsString()
  @MinLength(3)
  user: string;

  @IsString()
  @MinLength(5)
  password: string;
}
