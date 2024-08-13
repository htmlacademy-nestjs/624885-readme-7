import { Injectable } from '@nestjs/common';
import { VideoPostRepository } from './video-post.repository';
import { VideoPostEntity } from './video-post.entity';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly repository: VideoPostRepository
  ) {}

  public async create(entity: VideoPostEntity): Promise<VideoPostEntity> {
    return this.repository.save(entity);
  }
}
