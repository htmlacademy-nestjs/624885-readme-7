import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@users/blog-user';
import { BcryptHasher } from '@project/helpers';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@users/config';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { NotifyModule } from '@users/notify';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from './refresh-token-module/refresh-token.module';

@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule,
    RefreshTokenModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    BcryptHasher,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ],
})
export class AuthenticationModule {}
