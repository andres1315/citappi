import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Income } from 'src/incomes/entities/income.entity';
export declare class Employe {
    id: number;
    firstName: string;
    lastName: string;
    state: number;
    phone: number;
    user: string;
    password: string;
    calendar?: Calendar[];
    createdAt: Date;
    updateAt: Date;
    incomes: Income[];
}
