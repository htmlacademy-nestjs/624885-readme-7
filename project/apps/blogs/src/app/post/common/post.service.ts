import { BlogTagService } from '@blogs/tag';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostEntity } from './post.entity';
import { BlogPostFactory } from './post.factory';
import { BlogPostRepository } from './post.repository';


export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogPostFactory: BlogPostFactory,
    private readonly blogTagService: BlogTagService
  ) {

    console.log(this.blogPostRepository);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const tags = await this.blogTagService.getTagsByTitles(dto.tags);
    const newPost = this.blogPostFactory.create({
      ...dto,
      comments: [],
      likes: [],
      tags
    });
    await this.blogPostRepository.save(newPost);
    return newPost
  }
}
