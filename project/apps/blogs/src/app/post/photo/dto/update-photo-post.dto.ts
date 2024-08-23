import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePhotoPostDto {
  @ApiProperty({
    description: 'Photo filename',
    example: 'photo.jpg'
  })
  @IsString()
  @IsOptional()
  public photo: string;
}
