import { IsMongoId, IsString } from 'class-validator';

export class AddLikeDto {
  @IsString()
  @IsMongoId({message: "userId must be MongoId"})
  public authorId: string;
}
