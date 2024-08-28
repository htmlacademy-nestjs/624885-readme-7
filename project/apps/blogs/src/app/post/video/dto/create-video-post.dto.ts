import { Title } from '@blogs/post';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, MaxLength, MinLength,  } from 'class-validator';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Video post title',
    example: 'This is my video'
  })
  @IsString()
  @MinLength(Title.MinLength)
  @MaxLength(Title.MaxLength)
  public title: string;

  @ApiProperty({
    description: 'Link to the video',
    example: 'https://youtube.com/fdgkjndfgkjd'
  })
  @IsString()
  @IsUrl()
  public link: string;
}
