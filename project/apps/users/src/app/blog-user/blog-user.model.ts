import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { AuthUser } from '@project/core';

@Schema({
  collection: 'users',
  timestamps: true
})
export class BlogUserModel extends Document implements AuthUser {
  @Prop({required: true})
  public email: string;

  @Prop({required: true})
  public name: string;

  @Prop()
  public avatar: string;

  @Prop({required: true})
  public passwordHash: string;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
