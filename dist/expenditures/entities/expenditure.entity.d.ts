import { Customer } from 'src/customers/entities/customer.entity';
import { Employe } from 'src/employes/entities/employe.entity';
export declare class Expenditure {
    id: number;
    description: string;
    value: number;
    third: number;
    typeTransaction: number;
    transactionId: number;
    state: number;
    userCreated: number;
    methodPayment: number;
    createdAt: Date;
    updatedAt: Date;
    customer: Customer;
    employe: Employe;
}
