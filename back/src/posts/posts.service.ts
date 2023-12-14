import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entities/user.entity';
import { PostRepository } from './repository/posts.repository';

@Injectable()
export class PostsService {
  private readonly logger = new Logger('ProductsService');

  constructor(private readonly postRepository: PostRepository) {}

  async create(createPostDto: CreatePostDto, user: User) {
    try {
      const post = await this.postRepository.createPost(createPostDto, user);
      return { ...post };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findByUser(paginationDto: PaginationDto, user: User) {
    try {
      const posts = await this.postRepository.findByUser(paginationDto, user);
      const count = 0;
      return { posts, count };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const posts = await this.postRepository.findAll(paginationDto);

      const count = 0;

      return { posts, count };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findBy(term: string, date: string, paginationDto: PaginationDto) {
    try {
      let posts;
      let count;

      if (term) {
        posts = await this.postRepository.findByTerm(paginationDto, term);
      }

      if (date) {
        posts = await this.postRepository.findByDate(paginationDto, date);
      }

      if (term && date) {
        posts = await this.postRepository.findByTermAndDate(
          paginationDto,
          term,
          date,
        );
      }

      if (!posts) throw new NotFoundException(`Posts not found`);

      return { posts, count };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  private handleDBExceptionError(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
