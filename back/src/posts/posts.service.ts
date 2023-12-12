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
import { validate as isUUID } from 'uuid';
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

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const posts = await this.postRepository.find({
      take: limit,
      skip: offset,
    });

    return posts.map(({ ...rest }) => ({
      ...rest,
    }));
  }

  async findOne(term: string) {
    let post: Post;

    if (isUUID(term)) {
      post = await this.postRepository.findOneBy({ id: term });
    } else {
      const queryBuilder = this.postRepository.createQueryBuilder('prod'); //alias de la tabla prodictp
      post = await queryBuilder
        .where('UPPER(title) =:title', {
          title: term.toUpperCase(),
        })
        .getOne();
    }

    if (!post) throw new NotFoundException(`Post with id: ${term} not found`);

    return post;
  }

  private handleDBExceptionError(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
