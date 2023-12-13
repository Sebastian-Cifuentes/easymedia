import { CreateUserDto } from '../dto';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository
  extends Repository<User>
  implements IUserRepository<User>
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(User, userRepository.manager);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      await this.save(user);
      delete user.password;
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async login(email: string): Promise<User> {
    try {
      email = email.toLowerCase().trim();
      const user = await this.findOne({
        where: { email },
        select: { email: true, password: true, id: true, fullName: true },
      });
      return user;
    } catch (err) {
      console.log(err);
    }
  }
}
