import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  testNodeServer() {
    console.log('in auth service accessing localhost');
    return this.http.get('http://localhost:8080/test');
  }
}
