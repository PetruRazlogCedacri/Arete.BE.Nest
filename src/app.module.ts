import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeesModule } from './employees/employees.module';
import { TypeOrmConfigService } from './config/typeorm-config.factory';
import { OfficesModule } from './offices/offices.module';
import { GroupsModule } from './groups/groups.module';
import { SeatsModule } from './seats/seats.module';
import { ReservationsModule } from './reservations/reservations.module';
import { AuthModule } from './auth/auth.module';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import JwtConfigService from './config/jwt-config.factory';
import { JwtStrategy } from './auth/strategies/jwt.strategy';

@Module({
  imports: [
    AuthModule,
    SeatsModule,
    GroupsModule,
    OfficesModule,
    EmployeesModule,
    ReservationsModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ThrottlerModule.forRoot({
      throttlers: [{ttl: seconds(3), limit: 3}]
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useClass: JwtConfigService
    })
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
