import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateExpenditureDto {
  @IsString()
  @Length(5)
  description: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  value: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  third: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @IsPositive()
  typeTrasnaction: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @IsPositive()
  userCreated: number;
}
