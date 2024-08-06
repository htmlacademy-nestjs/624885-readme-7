import { Module } from '@nestjs/common';
import { BlogCommentFactory } from './comment.factory';
import { BlogCommentRepository } from './comment.repository';

@Module({
  imports: [],
  providers: [BlogCommentFactory, BlogCommentRepository],
  exports: [BlogCommentRepository]
})
export class BlogCommentModule {}
