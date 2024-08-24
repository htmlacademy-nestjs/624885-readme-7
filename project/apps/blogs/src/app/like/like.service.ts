import { Injectable } from '@nestjs/common';
import { BlogLikeRepository } from './like.repository';
import { BlogLikeFactory } from './like.factory';

@Injectable()
export class BlogLikeService {
  constructor(
    private readonly blogLikeRepository: BlogLikeRepository,
    private readonly blogLikeFactory: BlogLikeFactory
  ) {}

  public async getLikes(postId: string) {
    return this.blogLikeRepository.findByPostId(postId);
  }

  public async getNumberOfLikes(postId: string) {
    return this.blogLikeRepository.countByPostId(postId);
  }

  public async addLike(postId: string, userId: string) {
    const newLike = this.blogLikeFactory.create({
      postId,
      userId
    });
    await this.blogLikeRepository.save(newLike);

    return newLike;
  }
}
