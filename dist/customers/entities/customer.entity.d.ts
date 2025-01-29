import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Income } from 'src/incomes/entities/income.entity';
export declare class Customer {
    id: number;
    firstName: string;
    lastName: string;
    state: number;
    phone?: number;
    createdAt: Date;
    calendar?: Calendar[];
    incomes: Income[];
    updateAt: Date;
}
