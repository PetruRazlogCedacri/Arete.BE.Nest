import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/employees/entities/employee.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
