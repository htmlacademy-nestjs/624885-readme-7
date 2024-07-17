import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { getMongoConnectionString } from '@project/helpers';

export function getMongooseOptions(): MongooseModuleAsyncOptions {

  return {
    useFactory: async (config: ConfigService) => {
      console.log(getMongoConnectionString({
        user: config.get<string>('mongo.user'),
        password: config.get<string>('mongo.password'),
        host: config.get<string>('mongo.host'),
        port: config.get<string>('mongo.port'),
        db: config.get<string>('mongo.db'),
      }))
      return {
        uri: getMongoConnectionString({
          user: config.get<string>('mongo.user'),
          password: config.get<string>('mongo.password'),
          host: config.get<string>('mongo.host'),
          port: config.get<string>('mongo.port'),
          db: config.get<string>('mongo.db'),
        })
      }
    },
    inject: [ConfigService]
  }
}
