import { Title } from '@blogs/post';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength, MinLength,  } from 'class-validator';

export class UpdateVideoPostDto {
  @ApiProperty({
    description: 'Video post title',
    example: 'This is my video'
  })
  @IsString()
  @MinLength(Title.MinLength)
  @MaxLength(Title.MaxLength)
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: 'Link to the video',
    example: 'https://youtube.com/fdgkjndfgkjd'
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  public link: string;
}
