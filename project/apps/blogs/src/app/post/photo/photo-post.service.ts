import { Injectable } from '@nestjs/common';
import { PhotoPostRepository } from './photo-post.repository';
import { PhotoPostEntity } from './photo-post.entity';
import { CreatePhotoPostDto } from './dto/create-photo-post.dto';
import { PhotoPostFactory } from './photo-post.factory';

@Injectable()
export class PhotoPostService {
  constructor(
    private readonly repository: PhotoPostRepository,
    private readonly factory: PhotoPostFactory
  ) {}

  public async create(dto: CreatePhotoPostDto, postId: string) {
    const entity = this.factory.create({
      ...dto,
      postId
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(entity: PhotoPostEntity) {
    return this.repository.update(entity);
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
