import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { MAX_TAG_COUNT, MAX_TAG_LENGTH, MIN_TAG_LENGTH, PostErrorMessage } from '../post.constant';
import { PostType } from '@prisma/client';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateVideoPostDto } from '../../video/dto/create-video-post.dto';
import { CreateTextPostDto } from '../../text/dto/create-text-post.dto';
import { CreateLinkPostDto } from '../../link/dto/create-link-post.dto';
import { CreatePhotoPostDto } from '../../photo/dto/create-photo-post.dto';
import { CreateQuotePostDto } from '../../quote/dto/create-quote-post.dto';

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

  @ApiProperty({
    description: 'Id of origin post',
    example: 'f186858e-99c8-4a62-a6ea-657a99a710f1'
  })
  @IsString()
  @IsOptional()
  public repostFrom?: string;

  @ApiProperty({
    description: 'Type of post',
    example: 'VIDEO'
  })
  @IsEnum(PostType, {message: PostErrorMessage.TypeError})
  public type: PostType;

  @IsArray()
  @IsOptional()
  @ArrayMaxSize(MAX_TAG_COUNT, {message: PostErrorMessage.TagCount})
  @IsString({each: true})
  @Length(MIN_TAG_LENGTH, MAX_TAG_LENGTH, {each: true, message: PostErrorMessage.TagLength})
  public tags: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateVideoPostDto)
  public videoPost?: CreateVideoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateTextPostDto)
  public textPost?: CreateTextPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateQuotePostDto)
  public quotePost?: CreateQuotePostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreatePhotoPostDto)
  public photoPost?: CreatePhotoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => CreateLinkPostDto)
  public linkPost?: CreateLinkPostDto;
}
