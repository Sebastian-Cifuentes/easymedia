import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPostRepository } from '../interfaces/posts-repository.interface';
import { Post } from '../entities/post.entity';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreatePostDto } from '../dto/create-post.dto';

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
    const { ...postDetails } = CreatePostDto;

    const post = this.postRepository.create({
      ...postDetails,
      user,
    });
    return await this.postRepository.save(post);
  }

  async findByUser(paginationDto: PaginationDto, user: User): Promise<Post[]> {
    const { limit = 2, offset = 0 } = paginationDto;
    const { id: userId } = user;

    const posts = await this.postRepository.find({
      where: { user: { id: userId } },
      take: limit,
      skip: offset,
    });

    const count = await this.postRepository.count({
      where: { user: { id: userId } },
    });
    return posts;
  }

  async findAll(paginationDto: PaginationDto): Promise<Post[]> {
    const { limit = 2, offset = 0 } = paginationDto;

    const posts = await this.postRepository.find({
      take: limit,
      skip: offset,
    });

    const count = await this.postRepository.count();
    return posts;
  }
  findByTerm(paginationDto: PaginationDto, term: string): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  findByDate(paginationDto: PaginationDto, date: string): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
  findByTermAndDate(
    paginationDto: PaginationDto,
    term: string,
    date: string,
  ): Promise<Post[]> {
    throw new Error('Method not implemented.');
  }
}
