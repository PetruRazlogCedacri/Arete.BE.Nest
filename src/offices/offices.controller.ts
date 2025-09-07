import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OfficesService } from './offices.service';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/employees/entities/employee.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('offices')
@UseGuards(JwtAuthGuard)
@Roles(Role.Admin, Role.GroupOwner)
export class OfficesController {
  constructor(private readonly officesService: OfficesService) {}
  
  @Post()
  @Roles(Role.Admin)
  create(@Body() createOfficeDto: CreateOfficeDto) {
    return this.officesService.create(createOfficeDto);
  }

  @Get()
  findAll() {
    return this.officesService.findAll();
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.officesService.findOne(+id);
  }
  
  @Patch(':id')
  @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateOfficeDto: UpdateOfficeDto) {
    return this.officesService.update(+id, updateOfficeDto);
  }
  
  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.officesService.remove(+id);
  }
}
