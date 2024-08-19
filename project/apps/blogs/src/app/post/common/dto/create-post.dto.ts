import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { MAX_TAG_COUNT, MAX_TAG_LENGTH, MIN_TAG_LENGTH, PostErrorMessage } from '../post.constant';
import { PostType } from '@prisma/client';
import { Type } from 'class-transformer';
import { CreateVideoPostDto } from '../../video/dto/create-video-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'Id of author of post',
    example: '12323534532456'
  })
  @IsString()
  @IsMongoId({message: PostErrorMessage.InvalidId})
  public authorId: string;

  @ApiProperty({
    description: 'Is this post is draft?',
    example: 'true'
  })
  @IsBoolean({message: PostErrorMessage.IsDraftWrongType})
  public isDraft: boolean;

  @IsString()
  @IsOptional()
  public repostFrom?: string;

  @IsEnum({PostType}, {message: PostErrorMessage.TypeError})
  public type: PostType;

  @IsArray()
  @ArrayMaxSize(MAX_TAG_COUNT, {message: PostErrorMessage.TagCount})
  @IsString({each: true})
  @Length(MIN_TAG_LENGTH, MAX_TAG_LENGTH, {each: true, message: PostErrorMessage.TagLength})
  public tags: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateVideoPostDto)
  public videoPost?: CreateVideoPostDto;
}
