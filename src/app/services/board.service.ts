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

  addBoard(bname, bdescription, buser_id) {
    const body = {
      board_name: bname,
      description: bdescription,
      user_id: buser_id
    };

    return this.http.post<any>(this.baseURL + '/addBoard', body);
  }

  getTasks(bboard_id) {
    const param = { params: { board_id: bboard_id } };

    return this.http.get<any>(this.baseURL + '/getTasks', param);
  }

  updateTaskList(taskid, listid) {
    const body = {
      task_id: taskid,
      list_id: listid,
    };
    return this.http.post<any>(this.baseURL + '/updateTaskList', body);
  }

  updateTask(taskid, taskname, taskdesc) {
    const body = {
      task_id: taskid,
      task_name: taskname,
      task_desc: taskdesc
    };
    return this.http.post<any>(this.baseURL + '/updateTask', body);
  }

  updateListName(llist_name, llist_id) {
    const body = {
      list_name: llist_name,
      list_id: llist_id,
    };
    return this.http.post<any>(this.baseURL + '/updateListName', body);
  }

  addTask(tname, tdesc, tlistid, authorid) {
    const body = {
      name: tname,
      desc: tdesc,
      list_id: tlistid,
      author_id: authorid
    };
    return this.http.post<any>(this.baseURL + '/addNewTask', body);
  }


  addList(tname, boardId) {
    const body = {
      name: tname,
      board_id: boardId
    };
    return this.http.post<any>(this.baseURL + '/addNewList', body);
  }

  deleteList(llistId) {
    const body = {
      list_id: llistId
    };
    return this.http.post<any>(this.baseURL + '/deleteList', body);
  }

  deleteTask(taskId) {
    const body = {
      task_id: taskId
    };
    return this.http.post<any>(this.baseURL + '/deleteTask', body);
  }

  deleteBoard(boardId) {
    const body = {
      board_id: boardId
    };
    return this.http.post<any>(this.baseURL + '/deleteBoard', body);
  }

  updateBoard(bname, bdesc, bboard_id) {
    const body = {
      name: bname,
      desc: bdesc,
      board_id: bboard_id
    };
    return this.http.post<any>(this.baseURL + '/updateBoard', body);
  }

  addCollab(buserid, broleid, bboard_id) {
    const body = {
      user_id: buserid,
      role_id: broleid,
      board_id: bboard_id
    };
    return this.http.post<any>(this.baseURL + '/addCollab', body);
  }

  getCollabs(bboard_id) {
    const param = { params: { board_id: bboard_id } };

    return this.http.get<any>(this.baseURL + '/getCollabs', param);
  }


  removeCollab(buserid, bboard_id) {
    const body = {
      user_id: buserid,
      board_id: bboard_id
    };
    return this.http.post<any>(this.baseURL + '/removeCollab', body);
  }

  getCurrentRole(buser_id, bboard_id) {
    const param = { params: { user_id: buser_id, board_id: bboard_id } };

    return this.http.get<any>(this.baseURL + '/getCurrentRole', param);
  }

}
