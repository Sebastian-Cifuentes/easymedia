import { Component, OnInit } from '@angular/core';
import { Paginator } from 'src/app/interfaces/Paginator';
import { Post } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.scss']
})
export class MyPostsComponent implements OnInit {

  posts!: Post[];
  totalPosts!: number;
  countPages = 0;

  constructor(
    private postsService: PostsService
  ) {} 

  async ngOnInit() {
      await this.getAll({limit: 2, offset: 0});
  }

  async getAll(pagination: Paginator) {
    const resp = await this.postsService.getAllPostsByUser(pagination);
    this.posts = resp.posts;
    this.totalPosts = resp.count;
    this.countPages = pagination.limit + pagination.offset > this.totalPosts ? this.totalPosts : pagination.limit + pagination.offset;
  }

}
