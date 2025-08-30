import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Repository } from 'typeorm';
import { Office } from './entities/office.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OfficesService {
  constructor(
    @InjectRepository(Office) private officeRepository: Repository<Office>,
  ) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
    const office = this.officeRepository.create(createOfficeDto);
    return await this.officeRepository.save(office);
  }

  async findAll(): Promise<Office[]> {
    return await this.officeRepository.find();
  }

  async findOne(id: number): Promise<Office> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
    return office;
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto): Promise<Office> {
    const office = await this.officeRepository.findOne({ where: { id } });
    if (!office) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
    await this.officeRepository.update(id, updateOfficeDto);
    return office;
  }

  async remove(id: number): Promise<void> {
    const result = await this.officeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Office with ID ${id} not found`);
    }
  }
}
