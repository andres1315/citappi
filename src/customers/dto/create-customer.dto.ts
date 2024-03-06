import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  @IsPositive()
  phone: number;
}
