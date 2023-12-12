import { Component } from '@angular/core';
import { Post } from 'src/app/interfaces/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent {

  posts!: Post[];
  totalPosts!: number;

  constructor(
    private postsService: PostsService
  ) {} 

  async ngOnInit() {
      await this.getAll();
  }

  async getAll() {
    const resp = await this.postsService.getAllPosts();
    this.posts = resp.posts;
    this.totalPosts = resp.count;
  }

}
