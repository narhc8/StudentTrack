import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { BoardService } from '../services/board.service';
import { StorageService } from '../services/storage.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('taskNewName', { static: false }) taskNewName: ElementRef;
  @ViewChild('taskNewDesc', { static: false }) taskNewDesc: ElementRef;
  @ViewChild('taskUpdateName', { static: false }) taskUpdateName: ElementRef;
  @ViewChild('taskUpdateDesc', { static: false }) taskUpdateDesc: ElementRef;
  @ViewChild('listNameInput', { static: false }) listNameInput: ElementRef;
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  @ViewChild('closeDeleteTaskModal', { static: false }) closeDeleteTaskModal: ElementRef;
  @ViewChild('closeAddTaskModal', { static: false }) closeAddTaskModal: ElementRef;
  @ViewChild('closeCollabModal', { static: false }) closeCollabModal: ElementRef;
  @ViewChild('closeAddListModal', { static: false }) closeAddListModal: ElementRef;
  @ViewChild('listValue') listValue: ElementRef;

  @ViewChild('boardNewName', { static: false }) boardNewName: ElementRef;

  @ViewChild('boardNewDesc', { static: false }) boardNewDesc: ElementRef;

  msg = '';
  lists = [];
  subs = new Subscription();

  boardName: any;
  boardDesc: any;
  boardId: any;
  listName: any;
  listId: any;
  userId: any;
  collabs: any;
  currentRole: any;

  currentTaskName: any;
  currentTaskDesc: any;
  currentTaskId: any;

  currentViewing = true;
  constructor(
    private dragulaService: DragulaService,
    private boardService: BoardService,
    private storageService: StorageService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private storage: StorageMap
  ) {
    this.userId = this.storageService.userId;
    if (storageService.groupCreated === true) {
      this.dragulaService.createGroup('VAMPIRES', {
        moves(el: any, container: any, handle: any): any {
          if (el.classList.contains('doNotMoveClass')) {
            storageService.groupCreated = true;
            return false;
          }
          storageService.groupCreated = true;
          return true;
        }
      });
    }
    this.setUp();
  }

  goBack() {
    this.location.back();
  }

  setUp() {
    const boardId = this.storageService.boardObj.board_id;
    this.lists = [];
    this.boardService.getTasks(boardId).subscribe((data) => {
      console.log(data);
      const input = data;
      const group = input.reduce((acc, item) => {
        if (!acc[item.list_name]) {
          acc[item.list_name] = [];
        }
        acc[item.list_name].push(item);
        return acc;
      }, {});

      for (const [listname, tasks] of Object.entries(group)) {
        if (tasks[0].task_name !== 'NONE') {
          this.lists.push({ list_name: listname, list_id: tasks[0].list_id, value: tasks });
          this.lists.sort((a, b) => {
            if (a.list_id < b.list_id) {
              return -1;
            } else if (a.list_id > b.list_id) {
              return 1;
            } else {
              return 0;
            }
          });
        } else {
          this.lists.push({ list_name: listname, list_id: tasks[0].list_id, value: null });
          this.lists.sort((a, b) => {
            if (a.list_id < b.list_id) {
              return -1;
            } else if (a.list_id > b.list_id) {
              return 1;
            } else {
              return 0;
            }
          });
        }
      }
      console.log(this.lists);

    });

    this.subs.add(this.dragulaService.drop('VAMPIRES')
      .subscribe(({ name, el, target, source, sibling }) => {
        // ...
        // console.log(source.parentElement.id); //element coming from
        const newListId = el.parentElement.parentElement.id;
        const taskIdArray = el.textContent.split('%%');
        const taskId = taskIdArray[1];
        console.log(newListId);
        console.log(taskId);
        if (newListId.length !== 0) {
          this.boardService.updateTaskList(taskId, newListId).subscribe((data) => {
            console.log(data);
          });
        }
      })
    );
  }
  ngOnInit() {
    this.boardName = this.storageService.boardObj.board_name;
    this.boardDesc = this.storageService.boardObj.board_desc;
    this.boardId = this.storageService.boardObj.board_id;

    this.boardService.getCurrentRole(this.storageService.userId, this.boardId).subscribe((data2) => {
      this.currentRole = data2[0].role_id;
    });

  }
  ngOnDestroy() {
    // destroy all the subscriptions at once
    this.subs.unsubscribe();
  }

  setListName(val, id) {
    this.listId = id;
    this.listName = val;
    this.listValue.nativeElement.value = val;
    this.listValue.nativeElement.placeholder = val;
  }

  setBoardData(val) {
    this.boardNewName.nativeElement.value = this.boardName;
    this.boardNewDesc.nativeElement.value = this.boardDesc;

    if (val === 'collabs') {
      this.getCollabs();
    }
  }

  setCardData(val) {
    this.currentTaskName = val.task_name;
    this.currentTaskDesc = val.task_desc;
    this.currentTaskId = val.task_id;
    this.currentViewing = true;
  }

  updateListName(val) {
    if ((val !== this.listName) && (val.length !== 0)) {
      this.boardService.updateListName(val, this.listId).subscribe((data) => {
        console.log(data);
        this.setUp();
      });
    } else if (val === this.listName) {
      this.closeModal.nativeElement.click();
    } else {
      alert('Sorry, you need to have a proper name for your list');
    }
    this.closeModal.nativeElement.click();

  }

  addNewTask(name, desc) {
    if (name.length === 0) {
      alert('Sorry, you cannot have a task without a name');
      this.closeAddTaskModal.nativeElement.click();
    } else {
      this.boardService.addTask(name, desc, this.listId, this.storageService.userId).subscribe((data) => {
        console.log(data);
        this.taskNewName.nativeElement.value = '';
        this.taskNewDesc.nativeElement.value = '';
        this.setUp();
      });
      this.closeAddTaskModal.nativeElement.click();
    }
  }

  addNewList(name) {
    if (name.length === 0) {
      alert('Sorry, you cannot have a list without a name');
      this.closeAddListModal.nativeElement.click();
    } else {
      this.boardService.addList(name, this.boardId).subscribe((data) => {
        console.log(data);
        this.listNameInput.nativeElement.value = '';
        this.setUp();
      });
      this.closeAddListModal.nativeElement.click();
    }
  }

  deleteList() {
    this.boardService.deleteList(this.listId).subscribe((data) => {
      console.log(data);
      this.setUp();
    });
    this.closeModal.nativeElement.click();
  }

  deleteBoard() {
    if (this.currentRole === 2 || this.currentRole === 3) {
      alert('Sorry, you are currently a Editor. Only creators can delete the board');
    } else {
      this.boardService.deleteBoard(this.boardId).subscribe((data) => {
        console.log(data);
        this.location.back();
      });
    }
  }

  updateBoard(name, desc) {
    if (name.length === 0) {
      alert('Sorry, you cannot have a board without a name');
      this.closeModal.nativeElement.click();
    } else {
      this.boardService.updateBoard(name, desc, this.boardId).subscribe((data) => {
        this.boardName = data[0][0].board_name;
        this.boardDesc = data[0][0].board_desc;
        console.log(data);
      });
      this.closeModal.nativeElement.click();
    }

  }

  addCollab(username, role) {
    if (username.length === 0) {
      alert('Sorry, you need to specify a username to add as a collaborator');
      this.closeCollabModal.nativeElement.click();
    } else {
      if (role === 'Editor') {
        this.boardService.addCollab(username, 2, this.boardId).subscribe((data) => {
          console.log(data);
        });
        this.closeCollabModal.nativeElement.click();
      } else if (role === 'Viewer') {
        this.boardService.addCollab(username, 3, this.boardId).subscribe((data) => {
          console.log(data);
        });
        this.closeCollabModal.nativeElement.click();
      }
    }
  }

  getCollabs() {
    this.boardService.getCollabs(this.boardId).subscribe((data) => {
      this.collabs = data;
    });
  }

  removeCollab(collab) {
    console.log(collab.role_name);
    console.log(this.currentRole);
    if (this.currentRole === 2 && collab.role_name === 'Creator') {
      alert('Sorry, you cannot remove the creator of this board');
    } else {
      this.boardService.removeCollab(collab.user_id, this.boardId).subscribe((data) => {
        console.log(data);
        this.getCollabs();
      });
    }
  }

  deleteTask(taskId) {
    console.log(taskId);
    this.boardService.deleteTask(taskId).subscribe((data) => {
      console.log(data);
      this.setUp();
    });
    this.closeDeleteTaskModal.nativeElement.click();
  }

  updateTask() {
    if (this.taskUpdateName.nativeElement.value.length === 0) {
      alert('Sorry, you cant have a task with no name');
    } else {
      this.boardService.updateTask(this.currentTaskId, this.taskUpdateName.nativeElement.value, this.taskUpdateDesc.nativeElement.value).subscribe((data) => {
        console.log(data);
        this.setUp();
      });
      this.closeDeleteTaskModal.nativeElement.click();
    }
  }

  updateView(viewing) {
    if (viewing) {
      this.currentViewing = false;
    } else {
      this.currentViewing = true;
    }
  }

}
