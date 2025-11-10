import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsNumber, MaxLength } from 'class-validator';

export class CreateSeatDto {
  @ApiProperty({ description: 'The room number(name) of the office' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({description: 'The seat owner is modifiable(SeatType.Dynamic) or not(SeatType.Static)'})
  @IsNumber()
  @IsNotEmpty()
  @MaxLength(1)
  type: number;

  @ApiProperty({description: 'The office id that the seat belongs to'})
  @IsNumber()
  @IsNotEmpty()
  office: number;
}
