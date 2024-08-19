import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';

export class CreateVideoPostDto {
  @ApiProperty({
    description: 'Video post title',
    example: 'This is my video'
  })
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'Link to the video',
    example: 'https://youtube.com/fdgkjndfgkjd'
  })
  @IsString()
  @IsUrl()
  public link: string;
}
