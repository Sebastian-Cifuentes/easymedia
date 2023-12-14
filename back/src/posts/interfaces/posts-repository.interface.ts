import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from 'src/auth/entities/user.entity';
import { PostsResponse } from './posts-response.interface';

export abstract class IPostRepository<T> {
  abstract createPost(createPostDto: CreatePostDto, user: User): Promise<T>;
  abstract findByUser(
    paginationDto: PaginationDto,
    user: User,
  ): Promise<PostsResponse>;
  abstract findAll(paginationDto: PaginationDto): Promise<PostsResponse>;
  abstract findByTerm(
    paginationDto: PaginationDto,
    term: string,
  ): Promise<PostsResponse>;
  abstract findByDate(
    paginationDto: PaginationDto,
    date: string,
  ): Promise<PostsResponse>;
  abstract findByTermAndDate(
    paginationDto: PaginationDto,
    term: string,
    date: string,
  ): Promise<PostsResponse>;
}
