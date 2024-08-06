import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogLikeService } from './like.service';
import { fillDto} from '@project/helpers';
import { LikeRdo } from './rdo/like.rdo';

@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    return this.blogLikeService.getNumberOfLikes(postId);
  }

  @Post('/')
  public async createComment(@Param('postId') postId: string, @Body() userId: string) {
    const newLike = await this.blogLikeService.addLike(postId, userId);
    return fillDto(LikeRdo, newLike.toPOJO());
  }
}
