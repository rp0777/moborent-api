import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsArray,
  IsIn,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCarDto {
  @ApiProperty({ example: 'Toyota' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Camry' })
  @IsString()
  model: string;

  @ApiProperty({ example: 2023 })
  @IsNumber()
  year: number;

  @ApiProperty({ example: 'White' })
  @IsString()
  color: string;

  @ApiProperty({ example: 'MH12AB1234' })
  @IsString()
  licensePlate: string;

  @ApiProperty({ example: 3500 })
  @IsNumber()
  dailyRate: number;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean;

  @ApiPropertyOptional({ example: ['Bluetooth', 'AC'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  features?: string[];

  @ApiPropertyOptional({ example: ['url1.jpg', 'url2.jpg'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiPropertyOptional({ example: 'Comfortable family car' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 12000 })
  @IsNumber()
  mileage: number;

  @ApiProperty({ example: 'diesel', enum: ['diesel', 'electric'] })
  @IsString()
  @IsIn(['diesel', 'electric'])
  fuelType: string;

  @ApiProperty({ example: 'automatic', enum: ['manual', 'automatic'] })
  @IsString()
  @IsIn(['manual', 'automatic'])
  transmission: string;

  @ApiProperty({ example: 5 })
  @IsNumber()
  seats: number;

  @ApiProperty({ example: 19.076 })
  @IsString()
  location: string;
}
