import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards = ['Test'];
  userId;

  constructor(private storage: StorageMap) {
    this.storage.get('user_id').subscribe((data) => (this.userId = data));
  }

  ngOnInit(): void {
    this.populateBoards();
  }

  viewBoard(board: string) {
    alert('Opening board ' + board + ' with ID ' + this.userId);
  }

  populateBoards(): void {}
}
