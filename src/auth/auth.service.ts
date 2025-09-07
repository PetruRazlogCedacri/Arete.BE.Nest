import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {

  constructor(private readonly employeeService: EmployeesService, private readonly jwtService: JwtService) {}

  async logIn(username: string,password:string): Promise<{ access_token: string }> {
    const employee = await this.employeeService.findOne(username);
    
    if(!employee){
      throw new UnauthorizedException("Invalid credentials");
    }
    
    const isMatch = await compare(password, employee.password);
    
    if (!isMatch) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const payload = {sub: employee.id, username: employee.username, role: employee.role};
    
    return { access_token: await this.jwtService.signAsync(payload) };
  }
  
  async validateUser(username: string, pass: string): Promise<any> {
    const employee = await this.employeeService.findOne(username);
    
    const isMatch = await compare(pass, employee?.password);
    if (isMatch) {
      // Exclude from result private data
      const {password, hashPassword, group, ...result } = employee;
      
      return result
    }
    return null;
  }
  
  async login(user: any) {
    const payload = {sub: user.id, username: user.username, role: user.role};
  
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
