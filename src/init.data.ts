import { DataSource } from 'typeorm';
import { Employee, Role } from './employees/entities/employee.entity';
import { CreateEmployeeDto } from './employees/dto/create-employee.dto';
import { Group } from './groups/entities/group.entity';
import { CreateGroupDto } from './groups/dto/create-group.dto';
import { Office } from './offices/entities/office.entity';
import { CreateOfficeDto } from './offices/dto/create-office.dto';

export async function initializeDatabase(dataSource: DataSource) {
  let savedGroups: Group[] = await initGroups(dataSource);
  await initEmployees(dataSource, savedGroups);
}

async function initEmployees(dataSource: DataSource, savedGroups: Group[]) {
  const employeeRepository = dataSource.getRepository(Employee);
  const employeesCount = await employeeRepository.count();
  const crme048 = employeeRepository.create({
    username: 'crme048',
    password: 'crme048',
    firstname: 'Petru',
    lastname: 'Razlog',
    email: 'razlogpetru@outlook.com',
    role: Role.Admin,
  });
  const crme049 = employeeRepository.create({
    username: 'crme049',
    password: 'crme049',
    firstname: 'Radu',
    lastname: 'Zamfir',
    email: 'raduzamfir@outlook.com',
    role: Role.GroupOwner,
    group: savedGroups.find((group) => group.name === 'PWS'),
  });
  const crme050 = employeeRepository.create({
    username: 'crme050',
    password: 'crme050',
    firstname: 'Marina',
    lastname: 'Slivkova',
    email: 'marinaslivkova@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'PWS'),
  });
  const crme051 = employeeRepository.create({
    username: 'crme051',
    password: 'crme051',
    firstname: 'Victor',
    lastname: 'Burlacu',
    email: 'victorburlacu@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'PWS'),
  });
  const crmf001 = employeeRepository.create({
    username: 'crmf001',
    password: 'crmf001',
    firstname: 'Crmf001',
    lastname: 'GroupOwner',
    email: 'crmf001@outlook.com',
    role: Role.GroupOwner,
    group: savedGroups.find((group) => group.name === 'Angular'),
  });
  const crmf002 = employeeRepository.create({
    username: 'crmf002',
    password: 'crmf002',
    firstname: 'Crmf002',
    lastname: 'User',
    email: 'crmf002@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'Angular'),
  });
  const crmf003 = employeeRepository.create({
    username: 'crmf003',
    password: 'crmf003',
    firstname: 'Crmf003',
    lastname: 'User',
    email: 'crmf003@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'Angular'),
  });
  const crmf004 = employeeRepository.create({
    username: 'crmf004',
    password: 'crmf004',
    firstname: 'Crmf004',
    lastname: 'User',
    email: 'crmf004@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'Angular'),
  });
  const crmh001 = employeeRepository.create({
    username: 'crmh001',
    password: 'crmh001',
    firstname: 'Crmh001',
    lastname: 'GroupOwner',
    email: 'crmh001@outlook.com',
    role: Role.GroupOwner,
    group: savedGroups.find((group) => group.name === 'Java'),
  });
  const crmh002 = employeeRepository.create({
    username: 'crmh002',
    password: 'crmh002',
    firstname: 'Crmh002',
    lastname: 'User',
    email: 'crmh002@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'Java'),
  });
  const crmh003 = employeeRepository.create({
    username: 'crmh003',
    password: 'crmh003',
    firstname: 'Crmh003',
    lastname: 'User',
    email: 'crmh003@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'Java'),
  });
  const crmh004 = employeeRepository.create({
    username: 'crmh004',
    password: 'crmh004',
    firstname: 'Crmh004',
    lastname: 'User',
    email: 'crmh004@outlook.com',
    role: Role.User,
    group: savedGroups.find((group) => group.name === 'Java'),
  });
  const initEmployees: CreateEmployeeDto[] = [
    crme048,
    crme049,
    crme050,
    crme051,
    crmf001,
    crmf002,
    crmf003,
    crmf004,
    crmh001,
    crmh002,
    crmh003,
    crmh004,
  ];
  if (employeesCount < initEmployees.length) {
    const employees = await employeeRepository.save(initEmployees);
    console.log(
      'Database seeded with initial employees :>> ',
      employees.map((employee) => employee.username)
    );
  }
}

async function initGroups(dataSource: DataSource) {
  const groupRepository = dataSource.getRepository(Group);
  const groupsCount = await groupRepository.count();

  const pws = groupRepository.create({
    name: 'PWS',
    color: '#33cc33',
    allocatedSeats: 6,
  });
  const angular = groupRepository.create({
    name: 'Angular',
    color: '#ff3300',
    allocatedSeats: 10,
  });
  const java = groupRepository.create({
    name: 'Java',
    color: '#6600ff',
    allocatedSeats: 8,
  });
  const initGroups: CreateGroupDto[] = [pws, angular, java];
  let savedGroups: Group[] = [];

  if (groupsCount < initGroups.length) {
    savedGroups = await groupRepository.save(initGroups);
    console.log('Database seeded with initial groups :>> ', savedGroups.map(group => group.name));
  }
  return savedGroups;
}

async function initOffices(dataSource:DataSource) {
  const officeRepository = dataSource.getRepository(Office);
  const officesCount = await officeRepository.count();

const _603 = officeRepository.create({
  name:'603',
  columns: 4,
  capacity:32
});
const _604 = officeRepository.create({
  name:'604',
  columns: 4,
  capacity:24
});
  const _605 = officeRepository.create({
    name:'605',
    columns: 4,
    capacity:48
  });

  const initOffices:CreateOfficeDto[] = [_603,_604,_605];
  let savedOffices: Office[] = [];

  if (officesCount < initOffices.length) {
    savedOffices = await officeRepository.save(initOffices);
    console.log('Database seeded with initial offices :>> ', savedOffices.map(office => office.name));
  }
  return savedOffices;
}

async function initSeats(dataSource:DataSource) {
  console.log('To do');
}