import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { BlogLikeService } from './like.service';
import { fillDto} from '@project/helpers';
import { LikeRdo } from './rdo/like.rdo';
import { AddLikeDto } from './dto/add-like.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LikeResponseMessages } from './like.constant';

@ApiTags('likes')
@Controller('posts/:postId/likes')
export class BlogLikeController {
  constructor(
    private readonly blogLikeService: BlogLikeService
  ) {}

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    description: LikeResponseMessages.LikesOk
  })
  @Get('/')
  public async show(@Param('postId') postId: string) {
    return this.blogLikeService.getNumberOfLikes(postId);
  }

  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.CREATED,
    description: LikeResponseMessages.LikeCreated
  })
  @Post('/')
  public async addLike(@Param('postId') postId: string, @Body() dto: AddLikeDto) {
    const newLike = await this.blogLikeService.addLike(postId, dto.authorId);
    return fillDto(LikeRdo, newLike.toPOJO());
  }
}
