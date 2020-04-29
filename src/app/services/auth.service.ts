import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.base_API_URL;
  constructor(private http: HttpClient) { }

  testNodeServer() {
    console.log('in auth service accessing localhost');
    return this.http.get(this.baseURL + '/test');
  }
}
