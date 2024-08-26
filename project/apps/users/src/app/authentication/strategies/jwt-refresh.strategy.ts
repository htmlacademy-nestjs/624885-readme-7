import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { jwtConfig } from '@users/config';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthenticationService } from '../authentication.service';
import { RefreshTokenPayload } from '@project/core';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { TokenNotExistsException } from '../exceptions/token-not-exists.exception';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthenticationService,
    private readonly refreshTokenService: RefreshTokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret
    });
  }

  public async validate({ tokenId, email}: RefreshTokenPayload) {
    if(! await this.refreshTokenService.isExists(tokenId)) {
      throw new TokenNotExistsException(tokenId);
    }
    await this.refreshTokenService.deleteRefreshSession(tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();

    return this.authService.getUserByEmail(email);
  }
}
