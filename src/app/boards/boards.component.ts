import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards: any;
  userId: any;

  constructor(private storage: StorageMap, private bServ: BoardService) {}

  ngOnInit(): void {
    this.storage.get('user_id').subscribe((data) => {
      this.userId = data;
      this.populateBoards(data);
    });
  }

  viewBoard(board: any) {
    alert('Opening board ' + board.board_name + ' with ID ' + this.userId);
  }

  populateBoards(uId): void {
    console.log(this.userId);
    this.bServ.getBoards(uId).subscribe((data) => {
      this.boards = data;
    });
  }
}
