import { IsString, MinLength } from 'class-validator';

export class FilterEmployeDto {
  @IsString()
  @MinLength(2)
  name: string;
}
