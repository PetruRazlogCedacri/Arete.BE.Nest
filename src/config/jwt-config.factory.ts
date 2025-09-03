import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export async function jwtConfigFactory(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  const secret = configService.get<string>('JWT_SECRET') || '0skLsRXj7QLRGWzgNKGbO65WWijVJ1CY2BizIIc31k6uR4gF0kv0a1EtHhv5Q1cK/ukyrmz4cPYV82RSJYMkJQ==';
  
  return {
    secret: secret,
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
    },
  };
}