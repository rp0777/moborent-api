import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsMongoId,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: '64fabc1234567890abcd1234', description: 'Car ID' })
  @IsMongoId()
  car: string;

  @ApiProperty({
    example: '2025-07-01',
    description: 'Start date (YYYY-MM-DD)',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-07-05', description: 'End date (YYYY-MM-DD)' })
  @IsDateString()
  endDate: string;

  @ApiProperty({ example: 'Mumbai', description: 'Pickup location' })
  @IsString()
  pickupLocation: string;

  @ApiProperty({ example: 'Rajat Patel', description: 'Customer name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'rajat@example.com', description: 'Customer email' })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '+919099999999',
    description: 'Customer phone number',
  })
  @IsPhoneNumber()
  phone: string;
}
