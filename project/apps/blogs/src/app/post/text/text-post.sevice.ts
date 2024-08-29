import { Injectable } from '@nestjs/common';
import { TextPostRepository } from './text-post.repository';
import { CreateTextPostDto, UpdateTextPostDto } from '@project/posts';
import { TextPostFactory } from './text-post.factory';

@Injectable()
export class TextPostService {
  constructor(
    private readonly repository: TextPostRepository,
    private readonly factory: TextPostFactory
  ) {}

  public async create(dto: CreateTextPostDto, postId: string) {
    const entity = this.factory.create({
      ...dto,
      postId,
      id: ''
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(dto: UpdateTextPostDto, postId: string) {
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
