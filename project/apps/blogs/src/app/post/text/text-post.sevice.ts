import { Injectable } from '@nestjs/common';
import { TextPostRepository } from './text-post.repository';
import { CreateTextPostDto } from './dto/create-text-post.dto';
import { TextPostFactory } from './text-post.factory';
import { UpdateTextPostDto } from './dto/update-text-post.dto';

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
