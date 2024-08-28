import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Title, Announce, Text } from '@blogs/post';

export class UpdateTextPostDto {
  @ApiProperty({
    description: 'Text post title',
    example: 'This is my text'
  })
  @IsString()
  @MinLength(Title.MinLength)
  @MaxLength(Title.MaxLength)
  @IsOptional()
  public title: string;

  @ApiProperty({
    description: 'Announce of Text Post',
    example: 'Far far away, behind the word mountains, far from the countries.'
  })
  @IsString()
  @MinLength(Announce.MinLength)
  @MaxLength(Announce.MaxLength)
  @IsOptional()
  public announce: string;

  @ApiProperty({
    description: 'Text of post',
    example: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind.'
  })
  @IsString()
  @MinLength(Text.MinLength)
  @MaxLength(Text.MaxLength)
  @IsOptional()
  public text: string;
}
