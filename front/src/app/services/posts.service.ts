import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Post } from '../interfaces/Post';
import { Paginator } from '../interfaces/Paginator';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private api_url = `${environment.apiUrl}/posts`;

  constructor(
    private http: HttpClient
  ) { }

  async createPost(post: Post) {
    return await lastValueFrom(
      this.http.post<Post>(`${this.api_url}`, post)
    );
  }

  async getAllPosts(pagination: Paginator) {

    const { limit, offset } = pagination;

    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return await lastValueFrom(
      this.http.get<{posts: Post[], count: number}>(`${this.api_url}`, {params})
    );
  }

  async getAllPostsByUser(pagination: Paginator) {
    const { limit, offset } = pagination;

    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);
    return await lastValueFrom(
      this.http.get<{posts: Post[], count: number}>(`${this.api_url}/findByUser`, {params})
    );
  }

  async getByTerm(term: string, pagination: Paginator) {
    const { limit, offset } = pagination;

    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);
    return await lastValueFrom(
      this.http.get<{posts: Post[], count: number}>(`${this.api_url}/${term}`, {params})
    );
  }


}
