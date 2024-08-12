import { IsBoolean, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PostErrorMessage } from '../post.constant';
import { PostType } from '@prisma/client';

export class CreatePostDto {
  @IsString()
  @IsMongoId({message: PostErrorMessage.InvalidId})
  public authorId: string;

  @IsBoolean({message: PostErrorMessage.IsDraftWrongType})
  public isDraft: boolean;

  @IsString()
  @IsOptional()
  public repostFrom?: string;

  @IsEnum({PostType}, {message: PostErrorMessage.TypeError})
  public type: PostType;
}
