import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { QUOTE_AUTHOR_MAX_LENGTH, QUOTE_AUTHOR_MIN_LENGTH, QUOTE_MAX_LENGTH, QUOTE_MIN_LENGTH } from '../../common/post.constant';

export class CreateQuotePostDto {
  @ApiProperty({
    description: 'Text of quote',
    example: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem a'
  })
  @IsString()
  @MinLength(QUOTE_MIN_LENGTH)
  @MaxLength(QUOTE_MAX_LENGTH)
  public text: string;

  @ApiProperty({
    description: 'Author of quote',
    example: 'St.Augustine'
  })
  @IsString()
  @MinLength(QUOTE_AUTHOR_MIN_LENGTH)
  @MaxLength(QUOTE_AUTHOR_MAX_LENGTH)
  public author: string;
}
