import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BlogPostService } from './post.service';
import { fillDto } from '@project/helpers';
import { PostRdo } from './rdo/post.rdo';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class BlogPostController {
  constructor(
    private readonly blogPostService: BlogPostService
  ) {}

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const post = await this.blogPostService.getPost(id);
    return fillDto(PostRdo, post.toPOJO())
  }

  @Post('/')
  public async create(@Body() dto: CreatePostDto) {
    const newPost = await this.blogPostService.createPost(dto);

    return fillDto(PostRdo, newPost.toPOJO());
  }
}
