import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { Reservation } from './entities/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from 'src/seats/entities/seat.entity';
import { Employee } from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([Seat]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
