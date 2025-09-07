import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BeforeInsert } from 'typeorm';
import { Group } from 'src/groups/entities/group.entity';
import { ApiProperty } from '@nestjs/swagger';
import { hash } from 'bcrypt';

export enum Role {
  User = 1,
  GroupOwner = 4,
  Admin = 8
}

@Entity('employees')
export class Employee {
  @ApiProperty({ description: 'Employee ID', type: 'number' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Username', type: 'string' })
  @Column({ name: 'username' })
  username: string;

  @ApiProperty({ description: 'Password', type: 'string' })
  @Column({ name: 'password' })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }

  @ApiProperty({ description: 'Firstname', type: 'string'})
  @Column({ name: 'firstname' })
  firstname: string;

  @ApiProperty({ description: 'Lastname', type: 'string'})
  @Column({ name: 'lastname' })
  lastname: string;

  @ApiProperty({ description: 'Email', type: 'string'})
  @Column({ name: 'email' })
  email: string;

  @ApiProperty({ description: 'Role', enum: [1, 4, 8]})
  @Column({ name: 'role', default: Role.User })
  role: Role;

  @ApiProperty({ description: 'Group', type: 'object', properties: {}})
  @ManyToOne(() => Group, (group) => group.employees, { nullable: true })
  group: Group;
}
