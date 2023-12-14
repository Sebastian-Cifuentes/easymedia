import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { ProductsController } from './posts.controller';
import { Post } from './entities/post.entity';
import { AuthModule } from '../auth/auth.module';
import { PostRepository } from './repository/posts.repository';

@Module({
  controllers: [ProductsController],
  providers: [PostsService, PostRepository],
  imports: [TypeOrmModule.forFeature([Post]), AuthModule],
  exports: [PostsService, TypeOrmModule],
})
export class PostsModule {}
