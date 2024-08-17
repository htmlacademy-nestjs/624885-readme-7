import { Entity, Like, StorableEntity } from '@project/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public userId: string;
  public postId: string;

  public toPOJO(): Like {
    return {
      id: this.id,
      userId: this.userId,
      postId: this.postId
    };
  }
}
