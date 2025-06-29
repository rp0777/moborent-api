import {
  Injectable,
  NotFoundException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from '../schemas/car.schema';
import { CreateCarDto } from '../dto/create-car.dto';
import { UpdateCarDto } from '../dto/update-car.dto';

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name);

  constructor(
    @InjectModel(Car.name) private readonly carModel: Model<CarDocument>,
  ) {}

  async findAll(
    page: number,
    limit: number,
    search?: string,
    sortBy: string = 'createdAt',
    order: 'asc' | 'desc' = 'desc',
  ) {
    const skip = (page - 1) * limit;
    const sort: Record<string, 1 | -1> = { [sortBy]: order === 'asc' ? 1 : -1 };

    const searchQuery = search
      ? {
          $or: [
            { brand: { $regex: search, $options: 'i' } },
            { model: { $regex: search, $options: 'i' } },
            { color: { $regex: search, $options: 'i' } },
            { licensePlate: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    try {
      const [data, total] = await Promise.all([
        this.carModel
          .find(searchQuery)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .exec(),
        this.carModel.countDocuments(searchQuery).exec(),
      ]);

      this.logger.log(`Fetched ${data.length} cars with search="${search}"`);
      return { data, total, page, limit };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fetch cars`, error.stack);
      } else {
        this.logger.error(`Failed to fetch cars`, String(error));
      }
    }
  }

  async findById(id: string): Promise<Car> {
    try {
      const car = await this.carModel.findById(id).exec();
      if (!car) {
        this.logger.warn(`Car with ID "${id}" not found`);
        throw new NotFoundException(`Car with ID "${id}" not found`);
      }
      return car;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to fing car with ID: ${id}`, error.stack);
      } else {
        this.logger.error(`Failed to fing car with ID: ${id}`, String(error));
      }
      throw new InternalServerErrorException('Failed to find car');
    }
  }

  async create(createCarDto: CreateCarDto): Promise<Car> {
    try {
      const newCar = new this.carModel(createCarDto);
      const result = await newCar.save();
      this.logger.log(`Created new car with ID: ${String(result._id)}`);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error('Failed to create car', error.stack);
      } else {
        this.logger.error('Failed to create car', String(error));
      }
      throw new InternalServerErrorException('Failed to create car');
    }
  }

  async update(id: string, updateCarDto: UpdateCarDto): Promise<Car> {
    try {
      const updatedCar = await this.carModel.findByIdAndUpdate(
        id,
        updateCarDto,
        {
          new: true,
          runValidators: true,
        },
      );

      if (!updatedCar) {
        this.logger.warn(`Car with ID "${id}" not found for update`);
        throw new NotFoundException(`Car with ID "${id}" not found`);
      }

      this.logger.log(`Updated car with ID: ${String(updatedCar._id)}`);
      return updatedCar;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(`Failed to update car with ID: ${id}`, error.stack);
      } else {
        this.logger.error(`Failed to update car with ID: ${id}`, String(error));
      }
      throw new InternalServerErrorException('Failed to update car');
    }
  }
}
