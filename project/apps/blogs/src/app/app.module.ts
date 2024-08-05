import { Module } from '@nestjs/common';
import { BlogPostModule } from './post/post.module';

@Module({
  imports: [ BlogPostModule ],
})
export class AppModule {}
