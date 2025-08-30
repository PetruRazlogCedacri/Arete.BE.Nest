import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { IsString, IsEmail, IsNumber, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
  @ApiProperty({ description: 'Username for the employee', required: false })
  @IsString()
  @IsOptional()
  @MinLength(3)
  username?: string;

  @ApiProperty({ description: 'Password for the employee account', required: false })
  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;

  @ApiProperty({ description: 'First name of the employee', required: false })
  @IsString()
  @IsOptional()
  firstname?: string;

  @ApiProperty({ description: 'Last name of the employee', required: false })
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiProperty({ description: 'Email address of the employee', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Role identifier for the employee', required: false })
  @IsNumber()
  @IsOptional()
  role?: number;
}