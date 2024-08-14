import { Injectable } from '@nestjs/common';
import { BlogTagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { BlogTagFactory } from './tag.factory';

@Injectable()
export class BlogTagService {
  constructor(
    private readonly blogTagRepository: BlogTagRepository,
    private readonly blogTagFactory: BlogTagFactory
  ) {}

  public async createTag(dto: CreateTagDto) {
    const newTag = this.blogTagFactory.create(dto);
    return this.blogTagRepository.save(newTag);
  }

  public async getTagById(id: string) {
    return this.blogTagRepository.findById(id);
  }

  public async getTagByTitle(title: string) {
    return this.blogTagRepository.findByTitle(title);
  }

  public async getTagsByTitles(titles: string[]) {
    const tags = await this.blogTagRepository.findByTitles(titles);

    if(tags.length !== titles.length) {
      const foundTagTitles = tags.map((tag) => tag.title);
      const notFoundTagTitles = titles.filter((title) => !foundTagTitles.includes(title));
      const promises = notFoundTagTitles.map((title) => this.createTag({title}));

      const newTags = await Promise.all(promises);
      return [...tags, ...newTags]
    }
    return tags;
  }
}
