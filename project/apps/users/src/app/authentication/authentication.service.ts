import { Injectable } from '@nestjs/common';
import { BlogUserRepository } from '@users/blog-user'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository
  ) {}
}
