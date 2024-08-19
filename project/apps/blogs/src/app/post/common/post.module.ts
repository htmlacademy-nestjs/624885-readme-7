import { Module } from '@nestjs/common';
import { BlogPostFactory } from './post.factory';
import { BlogPostRepository } from './post.repository';
import { BlogPostController } from './post.controller';
import { BlogPostService } from './post.service';
import { PrismaClientModule } from '@project/blogs-models';
import { BlogTagModule } from '@blogs/tag';
import { BlogCommentModule } from '@blogs/comment';
import { BlogLikeModule } from '@blogs/like';
import { VideoPostService } from '../video/video-post.service';
import { VideoPostRepository } from '../video/video-post.repository';
import { VideoPostFactory } from '../video/video-post.factory';


@Module({
  imports: [
    BlogCommentModule,
    BlogLikeModule,
    BlogTagModule,
    PrismaClientModule
  ],
  controllers: [BlogPostController],
  providers: [
    BlogPostFactory,
    BlogPostRepository,
    BlogPostService,
    VideoPostService,
    VideoPostRepository,
    VideoPostFactory
],
  exports: [BlogPostService]
})
export class BlogPostModule {}
