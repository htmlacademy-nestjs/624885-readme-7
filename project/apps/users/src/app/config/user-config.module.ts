import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './configurations/app.config';
import mongoConfig from './configurations/mongo/mongo.config';
import jwtConfig from './configurations/jwt/jwt.config';

const ENV_USERS_FILE = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig],
      envFilePath: ENV_USERS_FILE
    })
  ]
})
export class UserConfigModule {}
