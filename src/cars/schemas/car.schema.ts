import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CarDocument = Car & Document;

@Schema({ timestamps: true })
export class Car {
  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true, unique: true })
  licensePlate: string;

  @Prop({ required: true })
  dailyRate: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [String], default: [] })
  features: string[];

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop()
  description?: string;

  @Prop({ required: true })
  mileage: number;

  @Prop({ required: true, enum: ['diesel', 'electric'] })
  fuelType: string;

  @Prop({ required: true, enum: ['manual', 'automatic'] })
  transmission: string;

  @Prop({ required: true })
  seats: number;

  @Prop({
    required: true,
  })
  location: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
