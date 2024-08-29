import { Expose } from 'class-transformer';

export class TextPostRdo {
  @Expose()
  public title: string;

  @Expose()
  public announce: string;

  @Expose()
  public text: string;
}
