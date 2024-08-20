import { Injectable } from '@nestjs/common';
import { LinkPostRepository } from './link-post.repository';
import { LinkPostEntity } from './link-post.entity';
import { CreateLinkPostDto } from './dto/create-link-post.dto';
import { LinkPostFactory } from './link-post.factory';

@Injectable()
export class LinkPostService {
  constructor(
    private readonly repository: LinkPostRepository,
    private readonly factory: LinkPostFactory
  ) {}

  public async create(dto: CreateLinkPostDto, postId: string) {
    const entity = this.factory.create({
      ...dto,
      postId
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(entity: LinkPostEntity) {
    return this.repository.update(entity);
  }

  public async deleteById(id: string) {
    return this.repository.deleteById(id);
  }
}
