import { Injectable } from '@nestjs/common';
import { BlogTagRepository } from './tag.repository';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository
  ) {}

  public async getTagById(id: string) {
    return this.blogTagRepository.findById(id);
  }

  public async getTagByTitle(title: string) {
    return this.blogTagRepository.findByTitle(title);
  }
}
