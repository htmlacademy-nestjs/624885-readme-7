import { Comment, Entity, StorableEntity } from '@project/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public text: string;
  public authorId: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public postId: string;

  public toPOJO(): Comment {
    return {
      id: this.id,
      text: this.text,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      postId: this.postId
    }
  }
}
