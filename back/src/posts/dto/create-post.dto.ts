import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, MinLength } from 'class-validator';

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
  message?: string;

  @ApiProperty({
    description: 'Post message',
    nullable: false,
    minLength: 1,
  })
  @IsDate()
  @IsOptional()
  createdAt?: string;
}
