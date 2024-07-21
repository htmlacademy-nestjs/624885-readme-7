import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlogUserModule } from '@users/blog-user';
import { AuthenticationModule } from './authentication/authentication.module';
import { getMongooseOptions, UserConfigModule } from '@users/config';

@Module({
  imports: [
    AuthenticationModule,
    BlogUserModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
    UserConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
