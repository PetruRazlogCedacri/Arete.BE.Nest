import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Seat } from 'src/seats/entities/seat.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'color' })
  color: string;

  @Column({ name: 'allocated_seats' })
  allocatedSeats: number;

  @OneToMany(() => Employee, (employee) => employee.group)
  employees: Employee[];

  @ManyToMany(() => Seat, (seat) => seat.groups, { cascade: true })
  @JoinTable({ name: 'group_seats' })
  seats: Seat[];
}
