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

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Column({ name: 'type', type: 'int' })
  type: number;

  @ManyToOne(() => Office, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'office_id' })
  office: Office;

  @ManyToMany(() => Group, (group) => group.seats)
  groups: Group[];
}
