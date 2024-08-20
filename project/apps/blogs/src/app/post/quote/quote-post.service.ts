import { Injectable } from '@nestjs/common';
import { QuotePostRepository } from './quote-post.repository';
import { QuotePostEntity } from './quote-post.entity';
import { CreateQuotePostDto } from './dto/create-quote-post.dto';
import { QuotePostFactory } from './quote-post.factory';

@Injectable()
export class QuotePostService {
  constructor(
    private readonly repository: QuotePostRepository,
    private readonly factory: QuotePostFactory
  ) {}

  public async create(dto: CreateQuotePostDto, postId: string) {
    const entity = this.factory.create({
      ...dto,
      postId
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(entity: QuotePostEntity) {
    return this.repository.update(entity);
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
