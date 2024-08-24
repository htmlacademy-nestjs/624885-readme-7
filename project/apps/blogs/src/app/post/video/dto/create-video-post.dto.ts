import { TITLE_MIN_LENGTH, TITLE_MAX_LENGTH } from '@blogs/post';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, MinLength,  } from 'class-validator';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Video post title',
    example: 'This is my video'
  })
  @IsString()
  @MinLength(TITLE_MIN_LENGTH)
  @MaxLength(TITLE_MAX_LENGTH)
  public title: string;

  @ApiProperty({
    description: 'Link to the video',
    example: 'https://youtube.com/fdgkjndfgkjd'
  })
  @IsString()
  @IsUrl()
  public link: string;
}
