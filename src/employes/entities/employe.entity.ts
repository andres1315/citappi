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
export class Employe {
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
    type: 'float',
    nullable: false,
  })
  phone: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    unique: true,
  })
  user: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  password: string;

  @OneToMany(() => Calendar, (calendar) => calendar.employe)
  calendar?: Calendar[];

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

  @OneToMany(() => Income, (income) => income.userCreated)
  incomes: Income[];
}
