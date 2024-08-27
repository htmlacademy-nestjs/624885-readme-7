import { Module } from '@nestjs/common';
import { BlogPostModule } from './post/common/post.module';
import { BlogCommentModule } from './comment/comment.module';
import { BlogLikeModule } from './like/like.module';
import { BlogTagModule } from './tag/tag.module';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    BlogLikeModule,
    BlogTagModule
  ],
  exports: [BlogTagModule]
})
export class AppModule {}
