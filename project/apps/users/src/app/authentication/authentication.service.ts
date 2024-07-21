import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { AuthUser } from '@project/core';
import { BlogUserEntity, BlogUserRepository } from '@users/blog-user'
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from './authentication.constant';
import { mongoConfig } from '@users/config';
import { ConfigType } from '@nestjs/config';
import { BcryptHasher } from '@project/helpers';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(mongoConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof mongoConfig>,

    private readonly hasher: BcryptHasher,
  ) {}

  public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    const { email, name, password } = dto;

    const blogUser: AuthUser = {
      email,
      name,
      avatar: '',
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
}
