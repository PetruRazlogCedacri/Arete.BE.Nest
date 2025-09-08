import { PartialType } from '@nestjs/swagger';
import { CreateReservationDto } from './create-reservation.dto';
import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto extends PartialType(CreateReservationDto) {
  @ApiProperty({ description: 'Seat ID for the reservation', required: false })
  @IsInt()
  @IsOptional()
  seatId?: number;

  @ApiProperty({
    description: 'Employee ID making the reservation',
    required: false,
  })
  @IsString()
  @IsOptional()
  employeeId?: number;

  @ApiProperty({
    description: 'Start date of the reservation',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ description: 'End date of the reservation', required: false })
  @IsDateString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({
    description: 'User who created the reservation',
    required: false,
  })
  @IsString()
  @IsOptional()
  createdBy?: number;
}
