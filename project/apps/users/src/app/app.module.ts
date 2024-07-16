import { Module } from '@nestjs/common';

import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UserConfigModule } from './config/user-config.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    UserConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
