import { Component, OnInit } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BoardService } from '../services/board.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards: any;
  userId: any;

  constructor(
    private storage: StorageMap,
    private bServ: BoardService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.storage.get('user_id').subscribe((data) => {
      this.userId = data;
      this.populateBoards(data);
    });
  }

  viewBoard(board, location) {
    this.router.navigate([location + '/' + board.board_id + '/'], {relativeTo: this.route});
  }

  populateBoards(uId): void {
    console.log(this.userId);
    this.bServ.getBoards(uId).subscribe((data) => {
      this.boards = data;
      console.log(data);
    });
  }
}
