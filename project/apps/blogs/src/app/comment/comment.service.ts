import { Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentRepository } from './comment.repository';
import { BlogCommentFactory } from './comment.factory';
import { BlogPostService } from '../post/post.service';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService,
    private readonly blogCommentFactory: BlogCommentFactory
  ) {}

  public async getComments(postId: string): Promise<BlogCommentEntity> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const existsPost = await this.blogPostService.getPost(postId);
    const newComment = this.blogCommentFactory.createFromDto(dto, existsPost.id);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
