import { Calendar } from 'src/calendar/entities/calendar.entity';
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
    type: 'float',
    nullable: false,
  })
  phone: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Calendar, (calendar) => calendar.customer)
  calendar?: Calendar[];

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updateAt: Date;
}
