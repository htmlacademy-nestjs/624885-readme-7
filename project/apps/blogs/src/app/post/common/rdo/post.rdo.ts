import { PostType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CommentRdo } from '@blogs/comment';
import { LikeRdo } from '@blogs/like';
import { TagRdo } from '@blogs/tag';
import { VideoPostRdo } from '../../video/rdo/video-post.rdo';

export class PostRdo {
  @Expose()
  public id: string;

  @Expose()
  public authorId: string;

  @Expose()
  public isDraft: boolean;

  @Expose()
  public repostFrom?: string;

  @Expose()
  public type: PostType;

  @Expose()
  @Type(() => TagRdo)
  public tags: TagRdo[];

  @Expose()
  @Type(() => CommentRdo)
  public comments: CommentRdo[];

  @Expose()
  @Type(() => LikeRdo)
  public likes: LikeRdo;

  @Expose()
  public createdAt: Date;

  @Expose()
  public updatedAt: Date;

  @Expose()
  @Type(() => VideoPostRdo)
  public videoPost: VideoPostRdo;
}
