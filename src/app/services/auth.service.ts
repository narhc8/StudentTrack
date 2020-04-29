import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://3.234.246.29:8000';
  constructor(private http: HttpClient) { }

  testNodeServer() {
    console.log('in auth service accessing localhost');
    return this.http.get(this.baseURL + '/test');
  }
}
