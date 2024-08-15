import { Module } from '@nestjs/common';
import { BlogTagFactory } from './tag.factory';
import { BlogTagRepository } from './tag.repository';
import { BlogTagService } from './tag.service';

@Module({
  imports: [],
  providers: [BlogTagFactory, BlogTagRepository, BlogTagService],
  exports: [BlogTagService]
})
export class BlogTagModule {}
