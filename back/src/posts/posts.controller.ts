import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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

@ApiTags('Posts')
@Controller('posts')
export class ProductsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Posts was created',
    type: PostEntity,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiBearerAuth()
  create(@Body() createProductDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createProductDto, user);
  }

  @Get()
  @ApiResponse({ status: 201, description: 'Get all posts' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'No token' })
  @ApiBearerAuth()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }
}
