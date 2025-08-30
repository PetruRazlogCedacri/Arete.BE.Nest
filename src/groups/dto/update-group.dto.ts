import { PartialType } from '@nestjs/swagger';
import { CreateGroupDto } from './create-group.dto';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @ApiProperty({ description: 'Name of the group', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Color representing the group', required: false })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({
    description: 'Number of allocated seats in the group',
    required: false,
  })
  @IsNumber()
  @IsOptional()
  allocatedSeats?: number;
}
