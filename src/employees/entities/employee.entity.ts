import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { hash } from 'bcrypt';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @Column({ name: 'firstname' })
  firstname: string;

  @Column({ name: 'lastname' })
  lastname: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'role', default: 1 })
  role: number;

  @ManyToOne(() => Group, (group) => group.employees, { nullable: true })
  group: Group;
}
