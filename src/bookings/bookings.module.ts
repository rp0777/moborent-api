import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking, BookingSchema } from './schemas/booking.schema';
import { Car, CarSchema } from '../cars/schemas/car.schema';
import { BookingController } from './bookings.controller';
import { BookingService } from './services/bookings.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Booking.name, schema: BookingSchema },
      { name: Car.name, schema: CarSchema },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingsModule {}
