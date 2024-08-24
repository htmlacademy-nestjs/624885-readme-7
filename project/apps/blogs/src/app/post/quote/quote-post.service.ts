import { Injectable } from '@nestjs/common';
import { QuotePostRepository } from './quote-post.repository';
import { CreateQuotePostDto } from './dto/create-quote-post.dto';
import { QuotePostFactory } from './quote-post.factory';
import { UpdateQuotePostDto } from './dto/update-quote-post.dto';

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

  public async update(dto: UpdateQuotePostDto, postId: string) {
    const entity = await this.repository.findByPostId(postId);
    for(const [key, value] of Object.entries(dto)) {
      if( value !== undefined ) {
        entity[key] = value
      }
    }
    await this.repository.update(entity);
    return entity.toPOJO();
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
