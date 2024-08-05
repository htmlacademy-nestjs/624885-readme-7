import { BlogPostEntity } from './post.entity';
import { BlogPostRepository } from './post.repository';

export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }
}
