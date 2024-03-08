import { Type } from 'class-transformer';
import { MinLength } from 'class-validator';

export class FilterCustomerDto {
  @MinLength(3)
  @Type(() => String)
  name: string;
}
