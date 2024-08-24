import { Module } from '@nestjs/common';
import { BlogCommentFactory } from './comment.factory';
import { BlogCommentRepository } from './comment.repository';
import { BlogCommentController } from './comment.controller';
import { BlogCommentService } from './comment.service';

@Module({
  imports: [],
  controllers: [BlogCommentController],
  providers: [BlogCommentFactory, BlogCommentRepository, BlogCommentService],
  exports: [BlogCommentRepository, BlogCommentFactory]
})
export class BlogCommentModule {}
