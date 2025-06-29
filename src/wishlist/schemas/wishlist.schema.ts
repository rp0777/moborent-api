import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WishlistDocument = Wishlist & Document;

@Schema({ timestamps: true })
export class Wishlist {
  @Prop({ required: true })
  email: string; // user identification

  @Prop({ required: true })
  car: string;

  @Prop({ default: Date.now })
  addedAt: Date;
}

export const WishlistSchema = SchemaFactory.createForClass(Wishlist);
