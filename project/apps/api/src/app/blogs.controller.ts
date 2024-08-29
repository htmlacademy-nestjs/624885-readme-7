import 'multer';
import { Body, Controller, Delete, ForbiddenException, Get, HttpStatus, Param, Patch, Post, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { InjectUserIdInterceptor } from '@project/interceptors';
import { BlogPostQuery, BlogPostWithPaginationRdo, CreatePostDto, PostRdo, PostResponseMessage, UpdatePostDto } from '@project/posts';
import { ApplicationServiceURL } from './app.config';
import { PostType } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommentRdo, CommentResponseMessage, CreateCommentDto } from '@project/comments';
import { AddLikeDto, LikeRdo, LikeResponseMessages } from '@project/likes';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@Controller('blogs')
@UseFilters(AxiosExceptionFilter)
export class BlogsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiOperation({
    summary: 'Create post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  public async create(@Body() dto: CreatePostDto, @UploadedFile() file?: Express.Multer.File) {
    let photo = '';
    if(dto.type === PostType.PHOTO) {
      if(!file) {
        throw new Error('For post type Photo there must be file attached');
      }
      const formData = new FormData();
      formData.append('file', new Blob([file.buffer], {type: file.mimetype}), file.originalname);
      const { data: fileData } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData);
      photo = `${fileData.subDirectory}/${fileData.hashName}`;
    }
    const result = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blogs}/`, {...dto, photoPost: { photo }});
    return result;
  }

  @ApiOperation({
    summary: 'Get post by id',
  })
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
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blogs}/${id}`);
    return data;
  }

  @ApiOperation({
    summary: 'Get posts',
  })
  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: PostResponseMessage.PostsOk
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blogs}/`, {params: {...query}});
    return data;
  }

  @ApiOperation({
    summary: 'Update post by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: PostResponseMessage.PostUpdated
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Patch(':id')
  public async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const { data: postInfo } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blogs}/${id}`);
    if (dto.authorId !== postInfo.authorId) {
      throw new ForbiddenException('You can only edit your own post');
    }
    const { data } = await this.httpService.axiosRef.patch(`${ApplicationServiceURL.Blogs}/${id}`, dto);
    return data;
  }

  @ApiOperation({
    summary: 'Delete post by id',
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Delete(':id')
  public async delete(@Param('id') id: string, @Body() body) {
    const { data: postInfo } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blogs}/${id}`);
    if (body.authorId !== postInfo.authorId) {
      throw new ForbiddenException('You can only delete your own post');
    }
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Blogs}/${id}`);
    return data;
  }

  @ApiOperation({
    summary: 'Repost post by id',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: PostResponseMessage.PostCreated
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(':id/repost')
  public async repost(@Param('id') id: string, @Body() body) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blogs}/${id}/repost`, body);
    return data;
  }

  @ApiOperation({
    summary: 'Get comments by post id',
  })
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: CommentResponseMessage.CommentsFound
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: CommentResponseMessage.CommentsNotFound
  })
  @Get(':id/comments')
  public async getComments(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blogs}/${id}/comments`);
    return data;
  }

  @ApiOperation({
    summary: 'Add comments to post',
  })
  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: CommentResponseMessage.CommentCreated
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(':id/comments')
  public async createComment(@Param('id') id: string, @Body() dto: CreateCommentDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blogs}/${id}/comments`, dto);
    return data;
  }

  @ApiOperation({
    summary: 'Get likes count by post id',
  })
  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.OK,
    description: LikeResponseMessages.LikesOk
  })
  @Get(':id/likes')
  public async getLikes(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Blogs}/${id}/likes`);
    return data;
  }

  @ApiOperation({
    summary: 'Add like to post',
  })
  @ApiResponse({
    type: LikeRdo,
    status: HttpStatus.CREATED,
    description: LikeResponseMessages.LikeCreated
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post(':id/likes')
  public async addLike(@Param('id') id: string, @Body() dto: AddLikeDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blogs}/${id}/likes`, dto);
    return data;
  }
}
