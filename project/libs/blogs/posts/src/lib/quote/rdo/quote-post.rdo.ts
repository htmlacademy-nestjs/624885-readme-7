import { Expose } from 'class-transformer';

export class QuotePostRdo {
  @Expose()
  public text: string;

  @Expose()
  public author: string;
}
