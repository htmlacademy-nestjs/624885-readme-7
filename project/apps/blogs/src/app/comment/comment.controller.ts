import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogCommentService } from './comment.service';
import { fillDto} from '@project/helpers'
import { CommentRdo } from './rdo/comment.rdo';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = this.blogCommentService.getComments(postId);
    return fillDto(CommentRdo, comments);
  }

  @Post('/')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
