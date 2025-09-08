import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { EmployeesService } from 'src/employees/employees.service';
import { AuthResponseDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly employeeService: EmployeesService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<AuthResponseDto | null> {
    const employee = await this.employeeService.findOne(username);

    const isMatch = await compare(pass, employee?.password);
    if (isMatch) {
      // Exclude from result private data
      const { password, hashPassword, group, ...result } = employee;

      return result;
    }
    return null;
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload = { sub: user.id, username: user.username, role: user.role };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
