import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { GetUser } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({
    status: 201,
    description: 'Succesful register',
    type: User,
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: 'Succesful login',
    type: User,
  })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  @ApiResponse({
    status: 201,
    description: 'Token was changed',
    type: User,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  checkAuthStatus(@GetUser() user: User) {
    const token = this.authService.checkAuthStatus({ id: user.id });
    return { token, ...user };
  }
}
