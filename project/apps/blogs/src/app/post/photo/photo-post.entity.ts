import { Entity, StorableEntity, PhotoPost } from '@project/core';

export class PhotoPostEntity extends Entity implements StorableEntity<PhotoPost> {
  public photo: string;
  public postId: string;

  constructor(post: PhotoPost) {
    super();
    this.populate(post);
  }

  public populate(post: PhotoPost) {
    if(!post) {
      return;
    }

    this.photo = post.photo;
    this.postId = post.postId;
  }

  public toPOJO(): PhotoPost {
    return {
      photo: this.photo,
      postId: this.postId
    }
  }
}
