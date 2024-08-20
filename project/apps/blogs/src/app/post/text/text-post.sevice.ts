import { Injectable } from '@nestjs/common';
import { TextPostRepository } from './text-post.repository';
import { TextPostEntity } from './text-post.entity';
import { CreateTextPostDto } from './dto/create-text-post.dto';
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
      postId
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(entity: TextPostEntity) {
    return this.repository.update(entity);
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
