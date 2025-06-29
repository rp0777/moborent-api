import { Controller, Post, Delete, Get, Param } from '@nestjs/common';
// import { WishlistService } from './services/wishlist.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { WishlistService } from '../services/wishlist.service';

@ApiTags('Wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post(':email/:carId')
  @ApiOperation({ summary: 'Add a car to wishlist' })
  @ApiParam({ name: 'email' })
  @ApiParam({ name: 'carId' })
  async addToWishlist(
    @Param('email') email: string,
    @Param('carId') carId: string,
  ) {
    return this.wishlistService.addToWishlist(email, carId);
  }

  @Get(':email')
  @ApiOperation({ summary: 'Get wishlist items for a user' })
  @ApiParam({ name: 'email' })
  async getWishlist(@Param('email') email: string) {
    return this.wishlistService.getWishlist(email);
  }

  @Delete(':email/:carId')
  @ApiOperation({ summary: 'Remove a car from wishlist' })
  @ApiParam({ name: 'email' })
  @ApiParam({ name: 'carId' })
  async removeFromWishlist(
    @Param('email') email: string,
    @Param('carId') carId: string,
  ) {
    return this.wishlistService.removeFromWishlist(email, carId);
  }
}
