import { Expose } from 'class-transformer';

export class LinkPostRdo {
  @Expose()
  public link: string;

  @Expose()
  public description: string;
}
