import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { CommentErrorMessage } from '../comment.constant';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty({message: CommentErrorMessage.MessageIsEmpty})
  public text: string;

  @IsString()
  @IsMongoId({message: CommentErrorMessage.InvalidId})
  public authorId: string;
}
