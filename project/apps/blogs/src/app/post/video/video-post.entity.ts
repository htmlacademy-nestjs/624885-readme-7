import { StorableEntity, VideoPost } from '@project/core';
import { BlogPostEntity } from '@blogs/post';

export class VideoPostEntity extends BlogPostEntity implements StorableEntity<VideoPost> {
  public title: string;
  public link: string;

  constructor(post: VideoPost) {
    super(post);
    this.populate(post);
  }

  public populate(post: VideoPost) {
    if(!post) {
      return;
    }

    this.title = post.title;
    this.link = post.link;
  }

  public toPOJO(): VideoPost {
    const commonPOJO = super.toPOJO();

    return {
      ...commonPOJO,
      title: this.title,
      link: this.link
    }
  }
}
