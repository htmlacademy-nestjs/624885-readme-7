import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {

  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          user: config.get<string>('mongo.user'),
          password: config.get<string>('mongo.password'),
          host: config.get<string>('mongo.host'),
          port: config.get<string>('mongo.port'),
          db: config.get<string>('mongo.db'),
          authDB: config.get<string>('mongo.authDB')
        })
      }
    },
    inject: [ConfigService]
  }
}
