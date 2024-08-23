import { Entity, StorableEntity, LinkPost } from '@project/core';

export class LinkPostEntity extends Entity implements StorableEntity<LinkPost> {
  public description?: string;
  public link: string;
  public postId: string;

  constructor(post: LinkPost) {
    super();
    this.populate(post);
  }

  public populate(post: LinkPost) {
    if(!post) {
      return;
    }
    this.id = post.id;
    this.description = post.description;
    this.link = post.link;
    this.postId = post.postId;
  }

  public toPOJO(): LinkPost {
    return {
      id: this.id,
      description: this.description,
      link: this.link,
      postId: this.postId
    }
  }
}
