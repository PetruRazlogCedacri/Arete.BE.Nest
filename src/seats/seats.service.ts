import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>,
  ) {}

  async create(createSeatDto: CreateSeatDto): Promise<Seat> {
    const seat = this.seatRepository.create(createSeatDto);
    return await this.seatRepository.save(seat);
  }

  async findAll(): Promise<Seat[]> {
    return await this.seatRepository.find();
  }

  async findOne(id: number): Promise<Seat> {
    let seat: Seat | null;
    let errorMessage: string;

    seat = await this.seatRepository.findOne({ where: { id } });
    errorMessage = `Seat with id #${id} not found`;

    if (!seat) throw new NotFoundException(errorMessage);

    return seat;
  }

  async update(id: number, updateSeatDto: UpdateSeatDto): Promise<Seat> {
    const seat = await this.seatRepository.findOne({ where: { id } });

    if (!seat) {
      throw new NotFoundException(`Seat with id ${id} not found for update`);
    }

    await this.seatRepository.update(id, updateSeatDto);

    const updatedSeat = await this.seatRepository.findOne({ where: { id } });

    if (!updatedSeat) {
      throw new NotFoundException(`Seat with id ${id} not found after update`);
    }

    return seat;
  }

  async remove(id: number): Promise<void> {
    const result = await this.seatRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Seat with id ${id} not found for deletion`);
    }
  }
}
