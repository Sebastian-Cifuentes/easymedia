import {
  BadRequestException,
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

      return { ...post };
    } catch (err) {
      this.handleDBExceptionError(err);
    }
  }

  async findByUser(paginationDto: PaginationDto, user: User) {
    const { limit = 10, offset = 0 } = paginationDto;
    const { id: userId } = user;

    let posts = await this.postRepository.find({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
    });

    const count = await this.postRepository.count({
      where: { user: { id: userId } },
    });

    posts = posts.map(({ ...rest }) => ({
      ...rest,
    }));
    return { posts, count };
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    let posts = await this.postRepository.find({
      take: limit,
      skip: offset,
    });

    const count = await this.postRepository.count();

    posts = posts.map(({ ...rest }) => ({
      ...rest,
    }));

    return { posts, count };
  }

  async findByTerm(term: string) {
    const queryBuilder = this.postRepository.createQueryBuilder('prod');
    const posts = await queryBuilder
      .where('UPPER(title) LIKE :title', {
        title: `%${term.toUpperCase()}%`,
      })
      .getMany();

    if (!posts)
      throw new NotFoundException(`Posts with term: ${term} not found`);

    return posts;
  }

  async findByDate(date: Date) {
    const queryBuilder = this.postRepository.createQueryBuilder('prod');
    const posts = await queryBuilder
      .where('createdAt = :createdAt', {
        createdAt: date.toISOString(),
      })
      .getMany();

    if (!posts) throw new NotFoundException(`Posts not found`);

    return posts;
  }

  private handleDBExceptionError(error: any) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
