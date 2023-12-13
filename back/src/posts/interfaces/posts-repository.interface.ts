import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from 'src/auth/entities/user.entity';

export abstract class IPostRepository<T> {
  abstract createPost(createPostDto: CreatePostDto, user: User): Promise<T>;
  abstract findByUser(paginationDto: PaginationDto, user: User): Promise<T[]>;
  abstract findAll(paginationDto: PaginationDto): Promise<T[]>;
  abstract findByTerm(paginationDto: PaginationDto, term: string): Promise<T[]>;
  abstract findByDate(paginationDto: PaginationDto, date: string): Promise<T[]>;
  abstract findByTermAndDate(
    paginationDto: PaginationDto,
    term: string,
    date: string,
  ): Promise<T[]>;
}
