import 'multer';
import { ensureDir } from 'fs-extra';
import dayjs from 'dayjs';
import { extension } from 'mime-types';

import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { join } from 'node:path';
import { writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

import { FilesConfig } from '@project/files-config'
import { FileUploaderRepository } from './file-uploader.repository';
import { StoredFile } from 'libs/shared/core/src/lib/types/stored-file.interface';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);
  private readonly DATE_FORMAT = 'YYYY MM'

  constructor(
    @Inject(FilesConfig.KEY)
    private readonly config: ConfigType<typeof FilesConfig>,
    private readonly fileRepository: FileUploaderRepository
  ) {}

  private getUploadDirectoryPath(): string {
    return this.config.uploadDirectory;
  }

  private getUploadSubDirectoryPath(): string {
    const [year, month] = dayjs().format(this.DATE_FORMAT).split(' ');
    return join(year, month);
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getUploadSubDirectoryPath(), filename);
  }

  public async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectory = this.getUploadDirectoryPath();
      const subDirectory = this.getUploadSubDirectoryPath();
      let fileExtension = extension(file.mimetype);
      if(!fileExtension) {
        fileExtension = '';
      }
      const fileName = `${randomUUID()}.${fileExtension}`;
      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(uploadDirectory, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileExtension,
        fileName,
        path,
        subDirectory
      }
    } catch(error) {
      this.logger.error(`Error while saving file ${error.message}`);
      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileUploaderEntity> {
    const storedFile = await this.writeFile(file);
    const fileEntity = new FileUploaderFactory().create({
      hashName: storedFile.fileName,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: storedFile.path,
      size: file.size,
      subDirectory: storedFile.subDirectory,
      createdAt: undefined,
      updatedAt: undefined
    });

    const newEntity = await this.fileRepository.save(fileEntity);
    return newEntity;
  }

  public async getFile(fileId: string): Promise<FileUploaderEntity> {
    const existFile = await this.fileRepository.findById(fileId);
    if(!existFile) {
      throw new NotFoundException(`File with id: ${fileId} not found.`);
    }

    return existFile;
  }
}
