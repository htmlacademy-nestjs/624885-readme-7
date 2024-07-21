import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/helpers';

interface MongoConfig {
  user: string;
  password: string;
  host: string;
  port: string;
  db: string;
  authDB: string;
}

export function getMongooseOptions(): MongooseModuleAsyncOptions {

  return {
    useFactory: async (config: ConfigService) => {
      const mongoConfig = config.get<MongoConfig>('mongo');
      return {
        uri: getMongoConnectionString(mongoConfig)
      }
    },
    inject: [ConfigService]
  }
}
