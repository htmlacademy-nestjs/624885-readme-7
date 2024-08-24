import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, ANNOUNCE_MIN_LENGTH, ANNOUNCE_MAX_LENGTH, TEXT_MIN_LENGTH, TEXT_MAX_LENGTH } from '@blogs/post';

export class UpdateTextPostDto {
  @ApiProperty({
    description: 'Text post title',
    example: 'This is my text'
  })
  @IsString()
  @MinLength(TITLE_MIN_LENGTH)
  @MaxLength(TITLE_MAX_LENGTH)
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: 'Announce of Text Post',
    example: 'Far far away, behind the word mountains, far from the countries.'
  })
  @IsString()
  @MinLength(ANNOUNCE_MIN_LENGTH)
  @MaxLength(ANNOUNCE_MAX_LENGTH)
  @IsOptional()
  public announce: string;

  @ApiProperty({
    description: 'Text of post',
    example: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind.'
  })
  @IsString()
  @MinLength(TEXT_MIN_LENGTH)
  @MaxLength(TEXT_MAX_LENGTH)
  @IsOptional()
  public text: string;
}
