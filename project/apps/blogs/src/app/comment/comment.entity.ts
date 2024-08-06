import { Comment, Entity, StorableEntity } from '@project/core';

export class BlogCommentEntity extends Entity implements StorableEntity<Comment> {
  public text: string;
  public authorId: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public postId: string;

  constructor(comment?: Comment) {
    super();
    this.populate(comment);
  }

  public populate(comment?: Comment) {
    if(!comment) {
      return;
    }

    this.id = comment.id ?? undefined;
    this.text = comment.text;
    this.authorId = comment.authorId;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.postId = comment.postId;
  }

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
