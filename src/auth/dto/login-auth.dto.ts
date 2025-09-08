import { IsString, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/employees/entities/employee.entity';

export class LoginDto {
  @ApiProperty({ description: 'Unique username for the employee' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @ApiProperty({ description: 'Password for the employee account' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class AuthResponseDto {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: Role.User | Role.GroupOwner | Role.Admin;
}
