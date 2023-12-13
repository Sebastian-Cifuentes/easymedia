import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { DataSource, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class PostsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,

    private readonly dataSource: DataSource,
  ) {}

  async create(CreatePostDto: CreatePostDto, user: User) {
    // new Product();
    try {
      const { ...postDetails } = CreatePostDto;

      const post = this.postRepository.create({
        ...postDetails,
        user,
      });
      await this.postRepository.save(post);
      //TODO: refactor the code. tech debt

      return { ...post };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findByUser(paginationDto: PaginationDto, user: User) {
    try {
      const { limit = 2, offset = 0 } = paginationDto;
      const { id: userId } = user;

      let posts = await this.postRepository.find({
        where: { user: { id: userId } },
        take: limit,
        skip: offset,
      });

      const count = await this.postRepository.count({
        where: { user: { id: userId } },
      });
      //TODO: refactor the code. tech debt

      posts = posts.map(({ ...rest }) => ({
        ...rest,
      }));
      return { posts, count };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    try {
      const { limit = 2, offset = 0 } = paginationDto;

      let posts = await this.postRepository.find({
        take: limit,
        skip: offset,
      });

      const count = await this.postRepository.count();
      //TODO: refactor the code. tech debt

      posts = posts.map(({ ...rest }) => ({
        ...rest,
      }));

      return { posts, count };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findBy(term: string, date: string, paginationDto: PaginationDto) {
    try {
      let queryBuilder = this.postRepository.createQueryBuilder('prod');
      const { limit = 2, offset = 0 } = paginationDto;
      queryBuilder = queryBuilder.offset(offset);
      queryBuilder = queryBuilder.limit(limit);
      let posts;
      let count;

      if (term) {
        posts = await queryBuilder
          .where('UPPER(title) LIKE :title', {
            title: `%${term.toUpperCase()}%`,
          })
          .getMany();

        count = await queryBuilder
          .where('UPPER(title) LIKE :title', {
            title: `%${term.toUpperCase()}%`,
          })
          .getCount();
      }

      if (date) {
        let startDate = new Date(JSON.parse(date));
        startDate = new Date(startDate.setHours(startDate.getHours() - 5));
        let finalDate = new Date(startDate);
        finalDate = new Date(finalDate.setHours(finalDate.getHours() + 24));
        posts = await queryBuilder
          .where('created_at > :start_date AND created_at < :final_date', {
            start_date: startDate.toISOString(),
            final_date: finalDate.toISOString(),
          })
          .getMany();

        count = await queryBuilder
          .where('created_at > :start_date AND created_at < :final_date', {
            start_date: startDate.toISOString(),
            final_date: finalDate.toISOString(),
          })
          .getCount();
      }

      if (term && date) {
        let startDate = new Date(JSON.parse(date));
        startDate = new Date(startDate.setHours(startDate.getHours() - 5));
        let finalDate = new Date(startDate);
        finalDate = new Date(finalDate.setHours(finalDate.getHours() + 24));
        posts = await queryBuilder
          .where('created_at > :start_date AND created_at < :final_date', {
            start_date: startDate.toISOString(),
            final_date: finalDate.toISOString(),
          })
          .andWhere('UPPER(title) LIKE :title', {
            title: `%${term.toUpperCase()}%`,
          })
          .getMany();

        count = await queryBuilder
          .where('created_at > :start_date AND created_at < :final_date', {
            start_date: startDate.toISOString(),
            final_date: finalDate.toISOString(),
          })
          .andWhere('UPPER(title) LIKE :title', {
            title: `%${term.toUpperCase()}%`,
          })
          .getCount();
      }

      //TODO: refactor the code. tech debt

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
