import { Component } from '@angular/core';
import { Paginator } from 'src/app/interfaces/Paginator';
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
  countPages!: number;
  pagination!: Paginator;
  term!: string;
  date!: string;


  constructor(
    private postsService: PostsService
  ) {} 

  async ngOnInit() {
      this.pagination = {limit: 2, offset: 0};
      await this.getAll();
  }

  async getAll() {
    const resp = this.term || this.date ?
      await this.postsService.getBy(this.pagination, this.term, this.date) :
      await this.postsService.getAllPosts(this.pagination);
    this.posts = resp.posts;
    this.totalPosts = resp.count;
    this.countPages = this.pagination.limit + this.pagination.offset >= this.totalPosts ? this.totalPosts : this.pagination.limit + this.pagination.offset;
  }

  async setTerm(term: string) {
    this.term = term;
    await this.getAll();
  } 

  async setDate(date: string) {
    this.date = date;
    await this.getAll();
  } 

  async setPagination(pagination: Paginator) {
    this.pagination = pagination;
    await this.getAll();
  } 

}
