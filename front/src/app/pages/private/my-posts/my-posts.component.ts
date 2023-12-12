import { Component, OnInit } from '@angular/core';
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

  constructor(
    private postsService: PostsService
  ) {} 

  async ngOnInit() {
      await this.getAll();
  }

  async getAll() {
    const resp = await this.postsService.getAllPostsByUser();
    this.posts = resp.posts;
    this.totalPosts = resp.count;
  }

}
