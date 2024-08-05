import { Entity, Like, StorableEntity } from '@project/core';

export class BlogLikeEntity extends Entity implements StorableEntity<Like> {
  public userId: string;
  public postId: string;

  constructor(like?: Like) {
    super();
    this.populate(like);
  }

  public populate(like?: Like) {
    if(!like) {
      return;
    }

    this.id = like.id ?? undefined;
    this.userId = like.userId;
    this.postId = like.postId;
  }

  public toPOJO(): Like {
    return {
      id: this.id,
      userId: this.userId,
      postId: this.postId
    };
  }
}
