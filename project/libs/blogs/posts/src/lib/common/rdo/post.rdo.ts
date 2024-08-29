import { PostType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CommentRdo } from '@project/comments';
import { LikeRdo } from '@project/likes';
import { TagRdo } from '@project/tags';
import { LinkPostRdo, PhotoPostRdo, QuotePostRdo, TextPostRdo, VideoPostRdo } from '@project/posts';

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

  @Expose()
  @Type(() => TextPostRdo)
  public textPost: TextPostRdo;

  @Expose()
  @Type(() => QuotePostRdo)
  public quotePost: QuotePostRdo;

  @Expose()
  @Type(() => PhotoPostRdo)
  public photoPost: PhotoPostRdo;

  @Expose()
  @Type(() => LinkPostRdo)
  public linkPost: LinkPostRdo;
}
