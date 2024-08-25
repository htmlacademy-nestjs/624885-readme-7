import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './configurations/app.config';
import mongoConfig from './configurations/mongo/mongo.config';
import jwtConfig from './configurations/jwt/jwt.config';
import rabbitConfig from './configurations/rabbit.config';

const ENV_USERS_FILE = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig, jwtConfig, rabbitConfig],
      envFilePath: ENV_USERS_FILE
    })
  ]
})
export class UserConfigModule {}
