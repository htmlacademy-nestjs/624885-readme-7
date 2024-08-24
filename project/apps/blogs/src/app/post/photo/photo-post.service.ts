import { Injectable } from '@nestjs/common';
import { PhotoPostRepository } from './photo-post.repository';
import { PhotoPostEntity } from './photo-post.entity';
import { CreatePhotoPostDto } from './dto/create-photo-post.dto';
import { PhotoPostFactory } from './photo-post.factory';
import { UpdatePhotoPostDto } from './dto/update-photo-post.dto';

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

  public async update(dto: UpdatePhotoPostDto, postId: string) {
    const entity = await this.repository.findByPostId(postId);
    for(const [key, value] of Object.entries(dto)) {
      if( value !== undefined ) {
        entity[key] = value
      }
    }
    await this.repository.update(entity);
    return entity.toPOJO();
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
