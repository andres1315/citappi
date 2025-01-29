import { Calendar } from 'src/calendar/entities/calendar.entity';
export declare class Service {
    id: number;
    service: string;
    time: number;
    state: number;
    isMounting: boolean;
    createdAt: Date;
    updateAt: Date;
    calendar?: Calendar[];
}
