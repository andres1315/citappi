import {
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateIncomeDto {
  @IsString()
  @MinLength(5)
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  value: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  third: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  typeTransaction: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  transactionId: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  userCreated: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  methodPayment: number;
}
