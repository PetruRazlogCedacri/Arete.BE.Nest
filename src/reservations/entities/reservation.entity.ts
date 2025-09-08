import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Seat, { nullable: false })
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;

  @Column({ name: 'start_date', type: 'datetime' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'datetime' })
  endDate: Date;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne(() => Employee, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: Employee;
}
