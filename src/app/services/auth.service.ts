import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.base_API_URL;
  constructor(private http: HttpClient) { }


  signup(signupData) {
    const body = {
      first_name: signupData.first_name,
      last_name: signupData.last_name,
      email: signupData.email,
      username: signupData.username,
      password: signupData.password
    }

    return this.http.post<any>(this.baseURL + '/signup', body);
  }

  login(loginData) {
    const body = {
      username: loginData.username,
      password: loginData.password
    }
    return this.http.post<any>(this.baseURL + '/login', body);
  }
}
