import { Entity, StorableEntity, QuotePost } from '@project/core';

export class QuotePostEntity extends Entity implements StorableEntity<QuotePost> {
  public text: string;
  public author: string;
  public postId: string;

  constructor(post: QuotePost) {
    super();
    this.populate(post);
  }

  public populate(post: QuotePost) {
    if(!post) {
      return;
    }
    this.id = post.id;
    this.text = post.text;
    this.author = post.author;
    this.postId = post.postId;
  }

  public toPOJO(): QuotePost {
    return {
      id: this.id,
      text: this.text,
      author: this.author,
      postId: this.postId
    }
  }
}
