import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import filesConfig from './files.config';

const ENV_FILE_PATH = 'apps/files/files.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [filesConfig],
      envFilePath: ENV_FILE_PATH
    })
  ]
})
export class FilesConfigModule {}
