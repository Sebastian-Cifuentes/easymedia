import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { IncomingHttpHeaders } from 'http';

import { AuthService } from './auth.service';
import { GetUser, GetHeaders } from './decorators';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-auth-status')
  checkAuthStatus(@GetUser() user: User) {
    const token = this.authService.checkAuthStatus({ id: user.id });
    return { user, token };
  }

  @Get('private')
  @UseGuards(AuthGuard())
  privateRoute(
    @GetUser() user: User,
    @GetUser('email') email: string,
    @GetHeaders() headers: string[],
    @Headers() headers1: IncomingHttpHeaders,
  ) {
    // console.log({user: request.user})
    return { ok: true, user, email, headers, headers1 };
  }
}
