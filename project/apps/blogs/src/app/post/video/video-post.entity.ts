import { Entity, StorableEntity, VideoPost } from '@project/core';

export class VideoPostEntity extends Entity implements StorableEntity<VideoPost> {
  public title: string;
  public link: string;
  public postId: string;

  constructor(post: VideoPost) {
    super();
    this.populate(post);
  }

  public populate(post: VideoPost) {
    if(!post) {
      return;
    }

    this.title = post.title;
    this.link = post.link;
    this.postId = post.postId;
  }

  public toPOJO(): VideoPost {
    return {
      title: this.title,
      link: this.link,
      postId: this.postId
    }
  }
}
