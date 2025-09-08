import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Role } from 'src/employees/entities/employee.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Request() req, @Body() createReservationDto: CreateReservationDto) {
    console.log('Request user :>> ', req.user);
    const user = req.user;
    const userRole = user.role;
    const username = user.username;

    switch (userRole) {
      case Role.Admin:
        return this.reservationsService.createByAdmin(createReservationDto);
      
      case Role.GroupOwner:
        return this.reservationsService.createByGroupOwner(username, createReservationDto);
      
      case Role.User:
      default:
        return this.reservationsService.createByUser(username, createReservationDto);
    }
  }

  @Get()
  findAll(@Request() req) {
    console.log('Request user :>> ', req.user);
    return this.reservationsService.findAll();
  }

  @Get(':id')
  findById(@Request() req, @Param('id') id: string) {
    console.log('Request user :>> ', req.user);
    return this.reservationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateReservationDto: UpdateReservationDto) {
    console.log('Request user :>> ', req.user);
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Request() req, @Param('id') id: string) {
    console.log('Request user :>> ', req.user);
    return this.reservationsService.remove(+id);
  }
}
