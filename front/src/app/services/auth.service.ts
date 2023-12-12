import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/User';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api_url = `${environment.apiUrl}/auth`;

  constructor(
    private http: HttpClient
  ) { }

  async login(user: User) {

    return await lastValueFrom(this.http.post<User>(`${this.api_url}/login`, user));

  }

  async register(user: User) {

    return await lastValueFrom(this.http.post<User>(`${this.api_url}/register`, user));

  }
}
