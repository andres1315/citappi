import { Calendar } from 'src/calendar/entities/calendar.entity';
import { Income } from 'src/incomes/entities/income.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    name: 'last_name',
  })
  lastName: string;

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
  phone?: number;

  @CreateDateColumn({
    type: 'timestamptz',

    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Calendar, (calendar) => calendar.customer)
  calendar?: Calendar[];

  @OneToMany(() => Income, (income) => income.third)
  incomes: Income[];

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updateAt: Date;
}
