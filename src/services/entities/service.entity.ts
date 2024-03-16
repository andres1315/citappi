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
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  service: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  time: number;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
  })
  state: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  isMounting: boolean;

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
  updateAt: Date;

  @OneToMany(() => Calendar, (calendar) => calendar.service, {
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  calendar?: Calendar[];
}
