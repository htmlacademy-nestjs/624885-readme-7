import { Injectable } from '@nestjs/common';
import { VideoPostRepository } from './video-post.repository';
import { VideoPostEntity } from './video-post.entity';

@Injectable()
export class VideoPostService {
  constructor(
    private readonly repository: VideoPostRepository
  ) {}

  public async create(entity: VideoPostEntity) {
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
