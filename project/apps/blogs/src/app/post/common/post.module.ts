import { Module } from '@nestjs/common';
import { BlogPostFactory } from './post.factory';
import { BlogPostRepository } from './post.repository';

@Module({
  providers: [BlogPostFactory, BlogPostRepository],
  exports: [BlogPostRepository]
})
export class BlogPostModule {}
