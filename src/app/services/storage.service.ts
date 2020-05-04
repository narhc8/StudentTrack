import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  boardObj: any;
  groupCreated: boolean;
  listName: any;
  userId: unknown;
  user_name: any;
  user: any;
  firstname: any;

  constructor() { }
}
