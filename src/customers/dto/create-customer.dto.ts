import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  @IsNumber()
  phone: number;
}
