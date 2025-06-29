import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../schemas/booking.schema';
import { Car, CarDocument } from 'src/cars/schemas/car.schema';
import { CreateBookingDto } from '../dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
  ) {}

  async createBooking(dto: CreateBookingDto): Promise<Booking> {
    const car = await this.carModel.findById(dto.car).exec();
    if (!car) {
      throw new NotFoundException('Car not found');
    }

    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    if (start >= end) {
      throw new BadRequestException('End date must be after start date');
    }

    // Check for overlapping bookings
    const conflict = await this.bookingModel.findOne({
      car: dto.car,
      $or: [
        {
          startDate: { $lte: end },
          endDate: { $gte: start },
        },
      ],
    });

    if (conflict) {
      throw new BadRequestException('Car is already booked for these dates');
    }

    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
    );

    const totalPrice = days * car.dailyRate;

    const booking = new this.bookingModel({
      ...dto,
      totalPrice,
      startDate: start,
      endDate: end,
    });

    return booking.save();
  }

  async getUserBookingsWithSearch(
    email: string,
    page: number,
    limit: number,
    search?: string,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ): Promise<{
    data: Booking[];
    total: number;
    page: number;
    limit: number;
  }> {
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = {
      [sortBy]: order === 'asc' ? 1 : -1,
    };

    const searchQuery: Record<string, unknown> = { email };

    if (search) {
      searchQuery['$or'] = [
        { pickupLocation: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.bookingModel
        .find(searchQuery)
        .populate('car')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.bookingModel.countDocuments(searchQuery),
    ]);

    return {
      data,
      total,
      page,
      limit,
    };
  }

  async findAllByUserEmail(email: string): Promise<Booking[]> {
    return this.bookingModel.find({ email }).populate('car').exec();
  }

  async findById(id: string): Promise<Booking> {
    const booking = await this.bookingModel.findById(id).populate('car').exec();
    if (!booking) {
      throw new NotFoundException(`Booking with ID "${id}" not found`);
    }
    return booking;
  }
}
