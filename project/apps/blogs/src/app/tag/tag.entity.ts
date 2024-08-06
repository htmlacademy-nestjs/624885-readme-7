import { Entity, StorableEntity, Tag } from '@project/core';

export class BlogTagEntity extends Entity implements StorableEntity<Tag> {
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(tag?: Tag) {
    super();
    this.populate(tag);
  }

  public populate(tag?: Tag) {
    if(!tag) {
      return;
    }

    this.id = tag.id ?? undefined;
    this.title = tag.title;
    this.createdAt = tag.createdAt;
    this.updatedAt = tag.updatedAt;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
