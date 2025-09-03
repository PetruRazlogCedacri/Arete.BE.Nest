import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Employee } from 'src/employees/entities/employee.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const employee = await this.employeeRepository.findOne({
      where: { username },
    });
    if (!employee) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatch = await compare(password, employee.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: employee.id, username: employee.username, role:employee.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(username: string, password: string) {
    return this.validateUser(username, password);
  }

  async profile(username: string) {
    return this.employeeRepository.findOne({ where: { username } });
  }
}
