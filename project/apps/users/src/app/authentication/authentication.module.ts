import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { BlogUserModule } from '@users/blog-user';
import { BcryptHasher } from '@project/helpers';

@Module({
  imports: [BlogUserModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, BcryptHasher],
})
export class AuthenticationModule {}
