import { ConflictException, Injectable } from '@nestjs/common';

import { BlogUserEntity, BlogUserRepository } from '@users/blog-user'
import { CreateUserDto } from './dto/create-user.dto';
import { AuthUser } from '@project/core';
import { AUTH_USER_EXISTS } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}

  public async register(dto: CreateUserDto) {
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

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    return this.blogUserRepository.save(userEntity);
  }
}
