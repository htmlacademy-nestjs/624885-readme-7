import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export function getJwtOptions(configService: ConfigService): JwtModuleOptions {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256'
    }
  }
}
