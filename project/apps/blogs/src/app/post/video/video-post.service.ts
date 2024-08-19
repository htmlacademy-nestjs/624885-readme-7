import { Injectable } from '@nestjs/common';
import { VideoPostRepository } from './video-post.repository';
import { VideoPostEntity } from './video-post.entity';
import { CreateVideoPostDto } from './dto/create-video-post.dto';
import { VideoPostFactory } from './video-post.factory';

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

  public async update(entity: VideoPostEntity) {
    return this.repository.update(entity);
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
