import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { GetUser } from '../auth/decorators';
import { User } from '../auth/entities/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostEntity } from './entities/post.entity';
import { AuthGuard } from '@nestjs/passport';
import { QueryFilterDto } from './dto/query.dto';

@ApiTags('Posts')
@Controller('posts')
export class ProductsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Post was created',
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Get all posts' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'No token' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get('findByUser')
  @ApiResponse({ status: 201, description: 'Get all posts by user' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'No token' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findByUser(@Query() paginationDto: PaginationDto, @GetUser() user: User) {
    return this.postsService.findByUser(paginationDto, user);
  }

  @Get('filter')
  @ApiResponse({ status: 201, description: 'Get all posts by filters' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'No token' })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  findBy(@Query() query: QueryFilterDto) {
    const { limit, offset, term, date } = query;
    return this.postsService.findBy(term, date, {
      limit,
      offset,
    });
  }
}
