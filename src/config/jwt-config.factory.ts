import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export async function jwtConfigFactory(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('JWT_SECRET') || 'defaultSecret',
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRATION') || '1h',
    },
  };
}
