import { IsInt, IsString, IsDateString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'Seat ID for the reservation' })
  @IsInt()
  @IsNotEmpty()
  seatId: number;

  @ApiProperty({ description: 'Employee ID making the reservation' })
  @IsString()
  @IsNotEmpty()
  employeeId: number;

  @ApiProperty({ description: 'Start date of the reservation' })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ description: 'End date of the reservation' })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ description: 'User who created the reservation' })
  @IsString()
  @IsNotEmpty()
  createdBy: number;
}
