import { Customer } from 'src/customers/entities/customer.entity';
import { Employe } from 'src/employes/entities/employe.entity';
import { Service } from 'src/services/entities/service.entity';
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
export class Calendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  start: Date;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  end: Date;

  @Column({
    type: 'text',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  notes: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  state: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  price: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 0,
  })
  payment: number;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updateAt: Date;

  @Column()
  employeId: number;

  @ManyToOne(() => Employe, (employe) => employe.calendar)
  @JoinColumn({ name: 'employeId' })
  employe?: Employe;

  @Column()
  customerId: number;

  @ManyToOne(() => Customer, (customer) => customer.calendar)
  @JoinColumn({ name: 'customerId' })
  customer?: Customer;

  @Column()
  serviceId: number;

  @ManyToOne(() => Service, (service) => service.calendar)
  @JoinColumn({ name: 'serviceId' })
  service: Service;
}
