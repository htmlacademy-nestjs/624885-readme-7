import { IsBoolean, IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { PostErrorMessage } from '../post.constant';
import { PostType } from '@prisma/client';

export class CreatePostDto {
  @IsString()
  @IsMongoId({message: PostErrorMessage.InvalidId})
  @IsOptional()
  public authorId?: string;

  @IsBoolean({message: PostErrorMessage.IsDraftWrongType})
  @IsOptional()
  public isDraft?: boolean;

  @IsString()
  @IsOptional()
  public repostFrom?: string;

  @IsEnum({PostType}, {message: PostErrorMessage.TypeError})
  @IsOptional()
  public type?: PostType;
}
