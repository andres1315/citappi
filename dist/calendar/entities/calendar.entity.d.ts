import { Customer } from 'src/customers/entities/customer.entity';
import { Employe } from 'src/employes/entities/employe.entity';
import { Service } from 'src/services/entities/service.entity';
export declare class Calendar {
    id: number;
    start: Date;
    end: Date;
    title: string;
    notes: string;
    state: number;
    price: number;
    payment: number;
    createdAt: Date;
    updateAt: Date;
    employeId: number;
    employe?: Employe;
    customerId: number;
    customer?: Customer;
    serviceId: number;
    service: Service;
}
