import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { Post } from '../interfaces/Post';

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

  async getAllPosts() {

    const params = new HttpParams()
      .set('limit', 2)
      .set('offset', 2);

    return await lastValueFrom(
      this.http.get<{posts: Post[], count: number}>(`${this.api_url}`, {params})
    );
  }

  async getAllPostsByUser() {
    const params = new HttpParams()
      .set('limit', 2)
      .set('offset', 2);
    return await lastValueFrom(
      this.http.get<{posts: Post[], count: number}>(`${this.api_url}/findByUser`, {params})
    );
  }

  async getByTerm(term: string) {
    const params = new HttpParams()
      .set('limit', 2)
      .set('offset', 2);
    return await lastValueFrom(
      this.http.get<{posts: Post[], count: number}>(`${this.api_url}/${term}`, {params})
    );
  }


}
