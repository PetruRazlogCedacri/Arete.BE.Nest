import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Seat } from 'src/seats/entities/seat.entity';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @OneToMany(() => Seat, (seat) => seat.office)
  seats: Seat[];

  @Column({ name: 'capacity', default: 0 })
  capacity: number;

  @Column({ name: 'columns', default: 0 })
  columns: number;
}
