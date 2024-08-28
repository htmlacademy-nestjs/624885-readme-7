import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { Quote, QuoteAuthor } from '../../common/post.constant';

export class CreateQuotePostDto {
  @ApiProperty({
    description: 'Text of quote',
    example: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem a'
  })
  @IsString()
  @MinLength(Quote.MinLength)
  @MaxLength(Quote.MaxLength)
  public text: string;

  @ApiProperty({
    description: 'Author of quote',
    example: 'St.Augustine'
  })
  @IsString()
  @MinLength(QuoteAuthor.MinLength)
  @MaxLength(QuoteAuthor.MaxLength)
  public author: string;
}
