import { Module } from '@nestjs/common';
import { BlogLikeFactory } from './like.factory';
import { BlogLikeRepository } from './like.repository';
import { PrismaClientModule } from '@project/blogs-models';
import { BlogLikeService } from './like.service';
import { BlogLikeController } from './like.controller';

@Module({
  imports: [PrismaClientModule],
  controllers: [BlogLikeController],
  providers: [BlogLikeFactory, BlogLikeRepository, BlogLikeService],
  exports: [BlogLikeService, BlogLikeFactory]
})
export class BlogLikeModule {}
