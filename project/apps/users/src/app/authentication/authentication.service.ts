import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';

import { AuthUser, Token, User } from '@project/core';
import { BlogUserEntity, BlogUserRepository } from '@users/blog-user'
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { BcryptHasher, createJWTPayload } from '@project/helpers';
import { JwtService } from '@nestjs/jwt';
import { jwtConfig } from '@users/config';
import { ConfigType } from '@nestjs/config';
import { RefreshTokenService } from './refresh-token-module/refresh-token.service';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly hasher: BcryptHasher,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, password, avatar } = dto;

    const blogUser: AuthUser = {
      email,
      name,
      avatar,
      passwordHash: ''
    }

    const existUser = await this.blogUserRepository.findByEmail(email);
    if(existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser)
      .setPassword(await this.hasher.hash(password));
    return this.blogUserRepository.save(userEntity);
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if(!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }
    if(!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = this.blogUserRepository.findById(id);
    if(!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async getUserByEmail(email: string) {
    const user = this.blogUserRepository.findByEmail(email);
    if(!user) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ...accessTokenPayload, tokenId: crypto.randomUUID()};
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);
    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      });
      return { accessToken, refreshToken };
    } catch(error) {
      this.logger.error(`[Token generation error: ${error.message}]`);
      throw new HttpException('Token generation error.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
