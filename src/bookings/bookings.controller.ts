import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { Booking } from './schemas/booking.schema';
import { BookingService } from './services/bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('user/:email')
  @ApiOperation({
    summary: 'Get bookings of a user with search, pagination, and sorting',
  })
  @ApiParam({ name: 'email', description: 'User email address' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'search', required: false, example: 'Mumbai' })
  @ApiQuery({ name: 'sortBy', required: false, example: 'startDate' })
  @ApiQuery({ name: 'order', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({ status: 200, description: 'List of user bookings returned' })
  async getUserBookingsWithSearch(
    @Param('email') email: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.bookingService.getUserBookingsWithSearch(
      email,
      page,
      limit,
      search,
      sortBy,
      order,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get booking details by booking ID' })
  @ApiParam({ name: 'id', description: 'Booking ID' })
  @ApiResponse({ status: 200, description: 'Booking found and returned' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBookingById(@Param('id') id: string): Promise<Booking> {
    return this.bookingService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking created successfully' })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or overlapping booking',
  })
  async create(@Body() dto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(dto);
  }
}
