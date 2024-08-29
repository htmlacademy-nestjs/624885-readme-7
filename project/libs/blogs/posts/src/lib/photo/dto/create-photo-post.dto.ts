import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePhotoPostDto {
  @ApiProperty({
    description: 'Photo filename',
    example: 'photo.jpg'
  })
  @IsString()
  public photo: string;
}
