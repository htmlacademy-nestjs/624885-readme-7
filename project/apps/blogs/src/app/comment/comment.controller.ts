import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { BlogCommentService } from './comment.service';
import { fillDto} from '@project/helpers'
import { CommentRdo, CreateCommentDto, CommentResponseMessage } from '@project/comments';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('posts/:postId/comments')
export class BlogCommentController {
  constructor(
    private readonly blogCommentService: BlogCommentService
  ) {}

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentResponseMessage.CommentsFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.CommentsNotFound
  })
  @Get('/')
  public async show(@Param('postId') postId: string) {
    const comments = this.blogCommentService.getComments(postId);
    return fillDto(CommentRdo, comments);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: CommentResponseMessage.CommentCreated
  })
  @Post('/')
  public async createComment(@Param('postId') postId: string, @Body() dto: CreateCommentDto) {
    const newComment = await this.blogCommentService.addComment(postId, dto);
    return fillDto(CommentRdo, newComment.toPOJO());
  }
}
