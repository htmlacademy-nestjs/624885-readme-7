import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { BlogPostService } from './post.service';
import { fillDto } from '@project/helpers';
import {
  BlogPostQuery,
  BlogPostWithPaginationRdo,
  CreatePostDto,
  PostRdo,
  PostResponseMessage,
  UpdatePostDto
} from '@project/posts';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: PostResponseMessage.PostNotFound
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(PostRdo, post.toPOJO())
  }

  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostsOk
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const result = await this.blogPostService.getAllPosts(query);

    return fillDto(BlogPostWithPaginationRdo, result);
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated
  })
  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);

    return fillDto(PostRdo, newPost.toPOJO());
  }

  @Post(':id/repost')
  public async repost(@Param('id') id: string, @Body() body) {
    const newRepost = await this.blogPostService.repostPost(id, body.authorId);
    return fillDto(PostRdo, newRepost.toPOJO());
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: PostResponseMessage.PostUpdated
  })
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const updatedPost = await this.blogPostService.updatePost(id, dto);

    return fillDto(PostRdo, updatedPost.toPOJO());
  }

  @Delete(':id')
  public async delete(@Param('id') id: string) {
    await this.blogPostService.deletePost(id);
  }
}
