import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@users/blog-user';
import { BcryptHasher } from '@project/helpers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@users/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    BcryptHasher,
    JwtAccessStrategy
  ],
})
export class AuthenticationModule {}
