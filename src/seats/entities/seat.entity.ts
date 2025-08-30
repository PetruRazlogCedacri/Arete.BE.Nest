import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'type', type: 'int' })
  type: number;

  @Column({ name: 'office_id', type: 'int' })
  officeId: number;

  @ManyToMany(() => Group, (group) => group.seats)
  groups: Group[];
}
