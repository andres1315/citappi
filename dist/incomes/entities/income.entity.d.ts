import { Customer } from 'src/customers/entities/customer.entity';
import { Employe } from 'src/employes/entities/employe.entity';
export declare class Income {
    id: number;
    description: string;
    value: number;
    third: number;
    typeTransaction: number;
    transactionId: number;
    state: number;
    userCreated: number;
    isAccounted: number;
    methodPayment: number;
    createdAt: Date;
    updateAt: Date;
    customer: Customer;
    employe: Employe;
}
