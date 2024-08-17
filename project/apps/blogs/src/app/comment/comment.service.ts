import { Injectable } from '@nestjs/common';
import { BlogCommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentRepository } from './comment.repository';
import { BlogCommentFactory } from './comment.factory';

@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogCommentFactory: BlogCommentFactory
  ) {}

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return this.blogCommentRepository.findByPostId(postId);
  }

  public async addComment(postId: string, dto: CreateCommentDto): Promise<BlogCommentEntity> {
    const newComment = this.blogCommentFactory.createFromDto(dto, postId);
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }
}
