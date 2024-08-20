import { Entity, StorableEntity, TextPost } from '@project/core';

export class TextPostEntity extends Entity implements StorableEntity<TextPost> {
  public title: string;
  public announce: string;
  public text: string;
  public postId: string;

  constructor(post: TextPost) {
    super();
    this.populate(post);
  }

  public populate(post: TextPost) {
    if(!post) {
      return;
    }

    this.title = post.title;
    this.announce = post.announce;
    this.text = post.text;
    this.postId = post.postId;
  }

  public toPOJO(): TextPost {
    return {
      title: this.title,
      announce: this.announce,
      text: this.text,
      postId: this.postId
    }
  }
}
