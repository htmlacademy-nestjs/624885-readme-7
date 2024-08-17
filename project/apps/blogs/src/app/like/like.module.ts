import { Module } from '@nestjs/common';
import { BlogLikeFactory } from './like.factory';
import { BlogLikeRepository } from './like.repository';
import { PrismaClientModule } from '@project/blogs-models';
import { BlogLikeService } from './like.service';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogLikeFactory, BlogLikeRepository, BlogLikeService],
  exports: [BlogLikeService, BlogLikeFactory]
})
export class BlogLikeModule {}
