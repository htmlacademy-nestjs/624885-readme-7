import { Module } from '@nestjs/common';
import { BlogLikeFactory } from './like.factory';
import { BlogLikeRepository } from './like.repository';
import { BlogPostModule } from '../post/common/post.module';

@Module({
  imports: [BlogPostModule],
  providers: [BlogLikeFactory, BlogLikeRepository],
  exports: [BlogLikeRepository]
})
export class BlogLikeModule {}
