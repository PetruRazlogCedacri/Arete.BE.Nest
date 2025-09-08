import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Employee } from 'src/employees/entities/employee.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  createByUser(
    username: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

  createByGroupOwner(
    username: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

  async createByAdmin(
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    const { seatId, employeeId, startDate, endDate, createdBy } =
      createReservationDto;

    const seat = await this.seatRepository.findOne({ where: { id: seatId } });
    if (!seat) throw new NotFoundException(`Seat with ID ${seatId} not found`);

    const employee = await this.employeeRepository.findOne({
      where: { id: employeeId },
    });
    if (!employee)
      throw new NotFoundException(`Employee with ID ${employeeId} not found`);

    const creator = await this.employeeRepository.findOne({
      where: { id: createdBy },
    });
    if (!creator)
      throw new NotFoundException(`Creator with ID ${createdBy} not found`);

    const reservation = this.reservationRepository.create({
      seat,
      employee,
      startDate,
      endDate,
      createdBy: creator,
    });

    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find();
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    return reservation;
  }

  async update(
    id: number,
    updateReservationDto: UpdateReservationDto,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['seat', 'employee', 'createdBy'],
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    const { seatId, employeeId, startDate, endDate, createdBy } =
      updateReservationDto;

    if (seatId !== undefined) {
      const seat = await this.seatRepository.findOne({ where: { id: seatId } });
      if (!seat)
        throw new NotFoundException(`Seat with ID ${seatId} not found`);
      reservation.seat = seat;
    }

    if (employeeId !== undefined) {
      const employee = await this.employeeRepository.findOne({
        where: { id: employeeId },
      });
      if (!employee)
        throw new NotFoundException(`Employee with ID ${employeeId} not found`);
      reservation.employee = employee;
    }

    if (createdBy !== undefined) {
      const creator = await this.employeeRepository.findOne({
        where: { id: createdBy },
      });
      if (!creator)
        throw new NotFoundException(`Creator with ID ${createdBy} not found`);
      reservation.createdBy = creator;
    }

    if (startDate !== undefined) {
      reservation.startDate = startDate;
    }

    if (endDate !== undefined) {
      reservation.endDate = endDate;
    }

    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }
}
