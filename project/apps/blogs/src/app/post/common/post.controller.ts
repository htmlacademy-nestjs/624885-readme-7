import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { BlogPostService } from './post.service';
import { fillDto } from '@project/helpers';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostResponseMessage } from './post.constant';
import { BlogPostWithPaginationRdo } from './rdo/post-with-pagination.rdo';
import { BlogPostQuery } from './post.query';
import { UpdatePostDto } from './dto/update-post.dto';

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
    const postsWithPagination = await this.blogPostService.getAllPosts(query);
    const result = {
      ...postsWithPagination,
      entities: postsWithPagination.entities.map((post) => post.toPOJO())
    }
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
