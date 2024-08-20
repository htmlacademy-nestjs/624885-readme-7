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
import { LinkPostFactory } from '../link/link-post.factory';
import { LinkPostRepository } from '../link/link-post.repository';
import { LinkPostService } from '../link/link-post.service';
import { PhotoPostFactory } from '../photo/photo-post.factory';
import { PhotoPostRepository } from '../photo/photo-post.repository';
import { PhotoPostService } from '../photo/photo-post.service';
import { QuotePostFactory } from '../quote/quote-post.factory';
import { QuotePostRepository } from '../quote/quote-post.repository';
import { QuotePostService } from '../quote/quote-post.service';
import { TextPostFactory } from '../text/text-post.factory';
import { TextPostRepository } from '../text/text-post.repository';
import { TextPostService } from '../text/text-post.sevice';


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
    VideoPostFactory,
    TextPostService,
    TextPostRepository,
    TextPostFactory,
    QuotePostService,
    QuotePostRepository,
    QuotePostFactory,
    PhotoPostService,
    PhotoPostRepository,
    PhotoPostFactory,
    LinkPostService,
    LinkPostRepository,
    LinkPostFactory,

],
  exports: [BlogPostService]
})
export class BlogPostModule {}
