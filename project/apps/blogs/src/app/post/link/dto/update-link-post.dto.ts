import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { LINK_DESCRIPTION_MAX_LENGTH } from '../../common/post.constant';

export class UpdateLinkPostDto {
  @ApiProperty({
    description: 'Description to link',
    example: 'This is the link.'
  })
  @IsString()
  @MaxLength(LINK_DESCRIPTION_MAX_LENGTH)
  @IsOptional()
  public description?: string;

  @ApiProperty({
    description: 'Link',
    example: 'https://link.to'
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  public link: string;
}
