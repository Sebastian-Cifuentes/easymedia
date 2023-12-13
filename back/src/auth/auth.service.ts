import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async create(createuserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.createUser(createuserDto);

      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (err) {
      this.handleError(err);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    let { email } = loginUserDto;
    const { password } = loginUserDto;

    email = email.toLowerCase().trim();

    const user = await this.userRepository.login(email);

    if (!user) throw new UnauthorizedException('Not valid credentials (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Not valid credentials (password)');

    delete user.password;
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  checkAuthStatus(payload: JwtPayload) {
    return this.getJwtToken(payload);
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleError(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    throw new InternalServerErrorException('Please check logs');
  }
}
