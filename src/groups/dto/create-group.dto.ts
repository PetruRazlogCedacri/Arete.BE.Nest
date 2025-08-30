import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ description: 'Name of the group' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Color representing the group' })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({ description: 'Number of allocated seats in the group' })
  @IsNumber()
  allocatedSeats: number;
}
