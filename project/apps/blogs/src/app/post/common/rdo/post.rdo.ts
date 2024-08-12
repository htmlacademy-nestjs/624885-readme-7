import { PostType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CommentRdo } from '../../../comment/rdo/comment.rdo';
import { LikeRdo } from '../../../like/rdo/like.rdo';
import { TagRdo } from '../../../tag/rdo/tag.rdo';

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
}
