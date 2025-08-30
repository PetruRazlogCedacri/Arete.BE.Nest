import { IsString, IsEmail, IsNumber, MinLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
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

  @ApiProperty({ description: 'First name of the employee' })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: 'Last name of the employee' })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'Email address of the employee' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Role identifier for the employee' })
  @IsNumber()
  role: number;
}