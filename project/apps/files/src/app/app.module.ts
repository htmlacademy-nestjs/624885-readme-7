import { Module } from '@nestjs/common';
import { FileUploaderModule } from '@project/file-uploader';
import { FilesConfigModule } from '@project/files-config';

@Module({
  imports: [
    FileUploaderModule,
    FilesConfigModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
