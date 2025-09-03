import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const jwtSecret =
      configService.get<string>('JWT_SECRET') ||
      '0skLsRXj7QLRGWzgNKGbO65WWijVJ1CY2BizIIc31k6uR4gF0kv0a1EtHhv5Q1cK/ukyrmz4cPYV82RSJYMkJQ==';

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: { sub: string; username: string; role:number }) {
    return { id: payload.sub, username: payload.username, role: payload.role };
  }
}
