import { Injectable } from '@nestjs/common';
import { LinkPostRepository } from './link-post.repository';
import { CreateLinkPostDto, UpdateLinkPostDto } from '@project/posts';
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
      postId,
      id: ''
    })
    return this.repository.save(entity);
  }

  public async findById(id: string) {
    return this.repository.findById(id);
  }

  public async update(dto: UpdateLinkPostDto, postId: string) {
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
