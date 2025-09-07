import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor( @InjectRepository(Reservation) private readonly reservationRepository: Repository<Reservation> ) {}

  createByUser(username: string, createReservationDto: CreateReservationDto): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

  createByGroupOwner(username: string, createReservationDto: CreateReservationDto): Promise<Reservation> {
    throw new Error('Method not implemented.');
  }

  async createByAdmin( createReservationDto: CreateReservationDto ): Promise<Reservation> {
    const reservation = this.reservationRepository.create(createReservationDto);
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

  async update( id: number, updateReservationDto: UpdateReservationDto ): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }

    await this.reservationRepository.update(id, updateReservationDto);
    const updatedReservation = await this.findOne(id);
    return updatedReservation;
  }

  async remove(id: number): Promise<void> {
    const result = await this.reservationRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Reservation with ID ${id} not found`);
    }
  }
}
