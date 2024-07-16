import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

const ENV_USERS_FILE = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [],
      envFilePath: ENV_USERS_FILE
    })
  ]
})
export class UserConfigModule {}
