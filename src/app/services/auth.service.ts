import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  testNodeServer() {
    console.log('in auth service accessing localhost');
    return this.http.get('http://127.0.0.1:8098/');
  }
}
