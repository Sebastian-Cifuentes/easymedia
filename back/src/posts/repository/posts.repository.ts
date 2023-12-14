import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPostRepository } from '../interfaces/posts-repository.interface';
import { Post } from '../entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostsResponse } from '../interfaces/posts-response.interface';

@Injectable()
export class PostRepository
  extends Repository<Post>
  implements IPostRepository<Post>
{
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {
    super(Post, postRepository.manager);
  }
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { ...postDetails } = createPostDto;

    const post = this.postRepository.create({
      ...postDetails,
      user,
    });
    return await this.postRepository.save(post);
  }

  async findByUser(
    paginationDto: PaginationDto,
    user: User,
  ): Promise<{ posts: Post[]; count: number }> {
    const { limit = 2, offset = 0 } = paginationDto;
    const { id: userId } = user;

    let posts = await this.postRepository.find({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
    });
    posts = posts.map(({ ...rest }) => ({
      ...rest,
    }));

    const count = await this.postRepository.count({
      where: { user: { id: userId } },
    });
    return { posts, count };
  }

  async findAll(paginationDto: PaginationDto): Promise<PostsResponse> {
    const { limit = 2, offset = 0 } = paginationDto;

    let posts = await this.postRepository.find({
      take: limit,
      skip: offset,
    });
    posts = posts.map(({ ...rest }) => ({
      ...rest,
    }));

    const count = await this.postRepository.count();
    return { posts, count };
  }
  async findByTerm(
    paginationDto: PaginationDto,
    term: string,
  ): Promise<PostsResponse> {
    let queryBuilder = this.postRepository.createQueryBuilder('prod');
    const { limit = 2, offset = 0 } = paginationDto;
    queryBuilder = queryBuilder.offset(offset);
    queryBuilder = queryBuilder.limit(limit);
    const posts = await queryBuilder
      .where('UPPER(title) LIKE :title', {
        title: `%${term.toUpperCase()}%`,
      })
      .getMany();

    const count = await queryBuilder
      .where('UPPER(title) LIKE :title', {
        title: `%${term.toUpperCase()}%`,
      })
      .getCount();
    return { posts, count };
  }

  async findByDate(
    paginationDto: PaginationDto,
    date: string,
  ): Promise<PostsResponse> {
    let queryBuilder = this.postRepository.createQueryBuilder('prod');
    const { limit = 2, offset = 0 } = paginationDto;
    queryBuilder = queryBuilder.offset(offset);
    queryBuilder = queryBuilder.limit(limit);
    let startDate = new Date(JSON.parse(date));
    startDate = new Date(startDate.setHours(startDate.getHours() - 5));
    let finalDate = new Date(startDate);
    finalDate = new Date(finalDate.setHours(finalDate.getHours() + 24));
    const posts = await queryBuilder
      .where('created_at > :start_date AND created_at < :final_date', {
        start_date: startDate.toISOString(),
        final_date: finalDate.toISOString(),
      })
      .getMany();
    const count = await queryBuilder
      .where('created_at > :start_date AND created_at < :final_date', {
        start_date: startDate.toISOString(),
        final_date: finalDate.toISOString(),
      })
      .getCount();

    return { posts, count };
  }

  async findByTermAndDate(
    paginationDto: PaginationDto,
    term: string,
    date: string,
  ): Promise<PostsResponse> {
    let queryBuilder = this.postRepository.createQueryBuilder('prod');
    const { limit = 2, offset = 0 } = paginationDto;
    queryBuilder = queryBuilder.offset(offset);
    queryBuilder = queryBuilder.limit(limit);

    let startDate = new Date(JSON.parse(date));
    startDate = new Date(startDate.setHours(startDate.getHours() - 5));
    let finalDate = new Date(startDate);
    finalDate = new Date(finalDate.setHours(finalDate.getHours() + 24));

    const posts = await queryBuilder
      .where('created_at > :start_date AND created_at < :final_date', {
        start_date: startDate.toISOString(),
        final_date: finalDate.toISOString(),
      })
      .andWhere('UPPER(title) LIKE :title', {
        title: `%${term.toUpperCase()}%`,
      })
      .getMany();

    const count = await queryBuilder
      .where('created_at > :start_date AND created_at < :final_date', {
        start_date: startDate.toISOString(),
        final_date: finalDate.toISOString(),
      })
      .andWhere('UPPER(title) LIKE :title', {
        title: `%${term.toUpperCase()}%`,
      })
      .getCount();

    return { posts, count };
  }
}
