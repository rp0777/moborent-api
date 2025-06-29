import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { Car } from './schemas/car.schema';
import { CarService } from './services/cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  @ApiOperation({
    summary: 'List all cars with pagination, search, and sorting',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    example: 'dailyRate',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc',
  })
  @ApiResponse({ status: 200, description: 'Paginated list of cars returned' })
  async getAllCars(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search') search?: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'asc' | 'desc',
  ) {
    return this.carService.findAll(page, limit, search, sortBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single car by ID' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiResponse({ status: 200, description: 'Car found and returned' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  async getCarById(@Param('id') id: string): Promise<Car> {
    return this.carService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new car listing' })
  @ApiResponse({ status: 201, description: 'Car successfully created' })
  async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carService.create(createCarDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing car by ID' })
  @ApiParam({ name: 'id', description: 'Car ID' })
  @ApiResponse({ status: 200, description: 'Car updated successfully' })
  @ApiResponse({ status: 404, description: 'Car not found' })
  @ApiBody({ type: UpdateCarDto }) // ⬅️ This is the key line
  async updateCar(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
  ): Promise<Car> {
    return this.carService.update(id, updateCarDto);
  }
}
