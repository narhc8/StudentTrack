import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  baseURL = environment.base_API_URL;
  constructor(private http: HttpClient) {}

  getBoards(userId) {
    const param = { params: { user_id: userId } };
    return this.http.get<any>(this.baseURL + '/getBoards', param);
  }

  addBoard(bname, bdescription, buserId) {
    const body = {
      board_name: bname,
      description: bdescription,
      user_id: buserId,
    };

    return this.http.post<any>(this.baseURL + '/addBoard', body);
  }
}
