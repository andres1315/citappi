import { Customer } from 'src/customers/entities/customer.entity';
import { Employe } from 'src/employes/entities/employe.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
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
    nullable: false,
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
    nullable: false,
    default: 1,
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
    nullable: false,
    default: 0,
    name: 'is_accounted',
  })
  isAccounted: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'method_payment',
  })
  methodPayment: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.id)
  @JoinColumn({ name: 'third' })
  customer: Customer;

  @ManyToOne(() => Employe, (employe) => employe.id)
  @JoinColumn({ name: 'user_created' })
  employe: Employe;
}
