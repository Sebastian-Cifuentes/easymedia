import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @MinLength(1)
  title: string;

  @ApiProperty({
    description: 'Post message',
    nullable: false,
    minLength: 1,
  })
  @IsString()
  @IsOptional()
  message?: string;
}
