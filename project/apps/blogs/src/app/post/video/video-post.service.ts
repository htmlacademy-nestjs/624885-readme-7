import { Injectable } from '@nestjs/common';
import { VideoPostRepository } from './video-post.repository';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { VideoPostFactory } from './video-post.factory';
import { UpdateVideoPostDto } from './dto/update-video-post.dto';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly repository: VideoPostRepository,
    private readonly factory: VideoPostFactory
  ) {}

  public async create(dto: CreateVideoPostDto, postId: string) {
    const entity = this.factory.create({
      ...dto,
      postId
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(dto: UpdateVideoPostDto, postId: string) {
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
