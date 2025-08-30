import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOfficeDto } from './create-office.dto';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateOfficeDto extends PartialType(CreateOfficeDto) {
  @ApiProperty({ description: 'The room number(name) of the office' })
  @IsString()
  @IsOptional()
  @MinLength(3)
  name: string;

  @ApiProperty({ description: 'The capacity of the office' })
  @IsNumber()
  @IsOptional()
  capacity: number;

  @ApiProperty({ description: 'The number of columns in the office' })
  @IsNumber()
  @IsOptional()
  columns: number;
}
