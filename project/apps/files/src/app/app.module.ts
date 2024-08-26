import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FileUploaderModule } from '@project/file-uploader';
import { FilesConfigModule, getMongooseOptions } from '@project/files-config';

@Module({
  imports: [
    FileUploaderModule,
    FilesConfigModule,
    MongooseModule.forRootAsync(getMongooseOptions())
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
