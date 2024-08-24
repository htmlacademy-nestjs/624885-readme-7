import 'multer';
import { ensureDir } from 'fs-extra';
import * as dayjs from 'dayjs';
import { extension } from 'mime-types';

import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

import { FilesConfig } from '@project/files-config'

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  constructor(
    @Inject(FilesConfig.KEY)
    private readonly config: ConfigType<typeof FilesConfig>
  ) {}

  private getUploadDirectoryPath(): string {
    const [year, month] = dayjs().format('YYYY MM').split(' ');
    return join(this.config.uploadDirectory, year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), filename);
  }

  public async saveFile(file: Express.Multer.File): Promise<string> {
    try {
      const uploadDirectory = this.getUploadDirectoryPath();
      const filename = randomUUID();
      const fileExtension = extension(file.mimetype);
      const destinationFile = this.getDestinationFilePath(`${filename}.${fileExtension}`);

      await ensureDir(uploadDirectory);
      await writeFile(destinationFile, file.buffer);

      return destinationFile;
    } catch(error) {
      this.logger.error(`Error while saving file ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }
}
