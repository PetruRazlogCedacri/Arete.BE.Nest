import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const group = this.groupRepository.create(createGroupDto);
    return await this.groupRepository.save(group);
  }

  async findAll(): Promise<Group[]> {
    return await this.groupRepository.find({ relations: ['employees'] });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['employees'],
    });

    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne({ where: { id } });
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }

    await this.groupRepository.update(id, updateGroupDto);
    const updatedGroup = await this.groupRepository.findOne({
      where: { id },
      relations: ['employees'],
    });
    if (!updatedGroup) {
      throw new NotFoundException(`Group with ID ${id} not found after update`);
    }
    return updatedGroup;
  }

  async remove(id: number): Promise<void> {
    const result = await this.groupRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  }
}
