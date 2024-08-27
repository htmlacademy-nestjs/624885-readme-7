import { Injectable } from '@nestjs/common';
import { BaseMongoRepository } from '@project/data-access';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenModel } from './refresh-token.model';
import { RefreshTokenFactory } from './refresh-token.factory';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RefreshTokenRepository extends BaseMongoRepository<RefreshTokenEntity, RefreshTokenModel> {
  constructor(
    entityFactory: RefreshTokenFactory,
    @InjectModel(RefreshTokenModel.name) model: Model<RefreshTokenModel>
  ) {
    super(entityFactory, model);
  }

  public async deleteByTokenId(tokenId: string) {
    return this.model.deleteOne({ tokenId }).exec();
  }

  public async findByTokenId(tokenId: string): Promise<RefreshTokenEntity | null> {
    const document = await this.model.findOne({ tokenId }).exec();
    return this.createEntityFromDocument(document);
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.model.deleteMany({ expiresIn: {$lt: new Date()}});
  }
}
