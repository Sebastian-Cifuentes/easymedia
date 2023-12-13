import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'posts' })
export class Post {
  @ApiProperty({
    example: '14d85da8-f823-42fc-9bab-8286011348e4',
    description: 'Post id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Post title',
    description: 'Post title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;

  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Post message',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  message: string;

  @ApiProperty({
    example: 'Lorem ipsum',
    description: 'Post date',
    default: null,
  })
  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.post, { eager: true })
  user: User;
}
