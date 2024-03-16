import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @MinLength(5)
  service: string;

  @IsNumber()
  @IsPositive()
  @Min(10)
  time: number;

  @IsOptional()
  @IsBoolean()
  isMounting: boolean;
}
