import { Expose } from 'class-transformer';

export class VideoPostRdo {
  @Expose()
  public title: string;

  @Expose()
  public link: string;
}
