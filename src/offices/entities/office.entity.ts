import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'capacity', default: 0 })
  capacity: number;

  @Column({ name: 'columns', default: 0 })
  columns: number;
}
