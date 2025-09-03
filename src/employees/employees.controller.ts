import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@Controller('employees')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('JWT-auth')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiOperation({ summary: 'Create employee' })
  @ApiResponse({ status: 200, type: CreateEmployeeDto, description: 'Employee created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }
  
  @Get()
  @ApiOperation({ summary: 'Find all employees' })
  @ApiResponse({ status: 200, type: [Employee], description: 'Employees retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.employeesService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Find employee by id' })
  @ApiResponse({ status: 200, type: Employee, description: 'Employee retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }
  
  @Patch(':id')
  @ApiOperation({ summary: 'Update employee' })
  @ApiResponse({ status: 200, type: UpdateEmployeeDto, description: 'Employee updated successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }
  
  @Delete(':id')
  @ApiOperation({ summary: 'Delete employee' })
  @ApiResponse({ status: 200, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
