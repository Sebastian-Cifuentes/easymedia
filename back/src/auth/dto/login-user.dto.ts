import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'sebas@email.com',
    description: 'User email',
    nullable: false,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password',
    nullable: false,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;
}
