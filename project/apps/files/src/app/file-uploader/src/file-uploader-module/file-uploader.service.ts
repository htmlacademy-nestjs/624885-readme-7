import 'multer';
import { ensureDir } from 'fs-extra';

import { Inject, Injectable, Logger } from '@nestjs/common';

import { FilesConfig } from '@project/files-config'
import { ConfigType } from '@nestjs/config';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(FilesConfig.KEY)
    private readonly config: ConfigType<typeof FilesConfig>
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectory = this.getUploadDirectoryPath();
      const destinationFile = this.getDestinationFilePath(file.originalname);

      await ensureDir(uploadDirectory);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch(error) {
      this.logger.error(`Error while saving file ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
