import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Wishlist, WishlistDocument } from '../schemas/wishlist.schema';
import { Model } from 'mongoose';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
  ) {}

  async addToWishlist(email: string, carId: string): Promise<Wishlist> {
    const exists = await this.wishlistModel.findOne({ email, car: carId });
    if (exists) return exists;

    const wishlist = new this.wishlistModel({ email, car: carId });
    return wishlist.save();
  }

  async getWishlist(email: string) {
    return this.wishlistModel.find({ email }).populate('car').exec();
  }

  async removeFromWishlist(email: string, carId: string) {
    const result = await this.wishlistModel.findOneAndDelete({
      email,
      car: carId,
    });
    if (!result) throw new NotFoundException('Item not found in wishlist');
    return { message: 'Removed from wishlist' };
  }
}
