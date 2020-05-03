import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { BoardService } from '../services/board.service';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  boards: any;
  userId: any;
  searchableBoards: any;
  noBoardsFound = false;

  constructor(
    private storage: StorageMap,
    private bServ: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.storage.get('user_id').subscribe((data) => {
      this.userId = data;
      this.populateBoards(data);
    });
  }

  viewBoard(board, location) {
    this.storageService.boardObj = board;
    this.router.navigate([location + '/' + board.board_id + '/'], {
      relativeTo: this.route,
    });
  }

  addBoard(name, description) {
    console.log(name);
    console.log(description);
    if (name.length !== 0) {
      this.bServ.addBoard(name, description, this.userId).subscribe((data) => {
        console.log(data);
        if (data.response === 'SUCCESS') {
          this.closeModal.nativeElement.click();
          this.populateBoards(this.userId);
        } else {
          alert('Something went wrong' + data.code);
        }
      });
    } else {
      alert('Sorry but board name cannot be empty');
    }
  }

  populateBoards(uId): void {
    console.log(this.userId);
    this.bServ.getBoards(uId).subscribe((data) => {
      this.searchableBoards = data;
      this.boards = data;
      console.log(data);
    });
  }

  searchBoards(ev) {
    console.log(ev);
    // Reset items back to all of the items
    this.searchableBoards = this.boards;
    // set val to the value of the ev target
    const varr = ev.target.value;
    if (varr && varr.trim() !== '') {
      this.searchableBoards = this.searchableBoards.filter((item) => {
        return (
          item.board_name.toLowerCase().indexOf(varr.toLowerCase()) > -1 ||
          item.board_name.toLowerCase().indexOf(varr.toLowerCase()) > -1
        );
      });
    }

    if (this.searchableBoards.length === 0) {
      this.noBoardsFound = true;
    } else {
      this.noBoardsFound = false;
    }
  }
}
