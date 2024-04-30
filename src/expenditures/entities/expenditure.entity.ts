import { Customer } from 'src/customers/entities/customer.entity';
import { Employe } from 'src/employes/entities/employe.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Expenditure {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  value: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  third: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
    name: 'type_transaction',
  })
  typeTransaction: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'transaction_id',
  })
  transactionId: number;

  @Column({
    type: 'int',
    default: 1,
    nullable: false,
  })
  state: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'user_created',
  })
  userCreated: number;

  @Column({
    type: 'int',
    nullable: true,
    name: 'method_payment',
    default: 1,
  })
  methodPayment: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'third' })
  customer: Customer;

  @ManyToOne(() => Employe, (employe) => employe.id)
  @JoinColumn({ name: 'user_created' })
  employe: Employe;
}
