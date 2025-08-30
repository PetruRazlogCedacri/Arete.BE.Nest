import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateOfficeDto {
  @ApiProperty({ description: 'The room number(name) of the office' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'The capacity of the office' })
  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @ApiProperty({ description: 'The number of columns in the office' })
  @IsNumber()
  @IsNotEmpty()
  columns: number;
}
