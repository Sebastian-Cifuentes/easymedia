import { CreateUserDto } from '../dto';

export abstract class IUserRepository<T> {
  abstract createUser(createUserDto: CreateUserDto): Promise<T>;

  abstract login(email: string): Promise<T>;
}
