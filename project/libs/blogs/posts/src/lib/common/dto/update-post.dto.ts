import { ArrayMaxSize, IsArray, IsBoolean, IsEnum, IsMongoId, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { PostErrorMessage, Tag } from '../post.constant';
import { PostType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { UpdateVideoPostDto } from '../../video/dto/update-video-post.dto';
import { UpdatePhotoPostDto } from '../../photo/dto/update-photo-post.dto';
import { UpdateQuotePostDto } from '../../quote/dto/update-quote-post.dto';
import { UpdateTextPostDto } from '../../text/dto/update-text-post.dto';
import { UpdateLinkPostDto } from '../../link/dto/update-link-post.dto';

export class UpdatePostDto {
  @ApiProperty({
    description: 'Id of author of post',
    example: '12323534532456'
  })
  @IsString()
  @IsMongoId({message: PostErrorMessage.InvalidId})
  @IsOptional()
  public authorId?: string;

  @ApiProperty({
    description: 'Is this post is draft?',
    example: 'true'
  })
  @IsBoolean({message: PostErrorMessage.IsDraftWrongType})
  @IsOptional()
  public isDraft?: boolean;

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
  @IsEnum({PostType}, {message: PostErrorMessage.TypeError})
  @IsOptional()
  public type?: PostType;

  @IsArray()
  @ArrayMaxSize(Tag.MaxCount, {message: PostErrorMessage.TagCount})
  @IsString({each: true})
  @Length(Tag.MinLength, Tag.MinLength, {each: true, message: PostErrorMessage.TagLength})
  @IsOptional()
  public tags: string[];

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateVideoPostDto)
  public videoPost?: UpdateVideoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateTextPostDto)
  public textPost?: UpdateTextPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateQuotePostDto)
  public quotePost?: UpdateQuotePostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdatePhotoPostDto)
  public photoPost?: UpdatePhotoPostDto;

  @ValidateNested()
  @IsOptional()
  @Type(() => UpdateLinkPostDto)
  public linkPost?: UpdateLinkPostDto;
}
