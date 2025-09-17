import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { Office } from 'src/offices/entities/office.entity';

export enum SeatType {
  Static = 1,
  Dynamic = 0,
}
@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'type', default:SeatType.Dynamic })
  type: SeatType;

  @ManyToOne(() => Office, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'office_id' })
  office: number;

  @ManyToMany(() => Group, (group) => group.seats)
  groups: Group[];
}
