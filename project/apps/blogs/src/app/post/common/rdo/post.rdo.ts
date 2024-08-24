import { PostType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { CommentRdo } from '@blogs/comment';
import { LikeRdo } from '@blogs/like';
import { TagRdo } from '@blogs/tag';
import { VideoPostRdo } from '../../video/rdo/video-post.rdo';
import { QuotePostRdo } from '../../quote/rdo/quote-post.rdo';
import { TextPostRdo } from '../../text/rdo/text-post.rdo';
import { PhotoPostRdo } from '../../photo/rdo/photo-post.rdo';
import { LinkPostRdo } from '../../link/rdo/link-post.rdo';

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
