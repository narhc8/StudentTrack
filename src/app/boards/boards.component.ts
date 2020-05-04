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
  @ViewChild('boardName', { static: false }) boardName: ElementRef;
  @ViewChild('boardDescription', { static: false }) boardDescription: ElementRef;

  @ViewChild('closeModal', { static: false }) closeModal: ElementRef;
  boards: any;
  userId: any;
  searchableBoards: any;
  noBoardsFound = false;
  name: any;

  constructor(
    private storage: StorageMap,
    private bServ: BoardService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    // this.storage.get('user').subscribe((data) => {
    //   console.log(data);
    // });
    this.name = this.storageService.firstname;
    console.log(this.storageService.firstname);
  }

  ngOnInit(): void {
    this.storage.get('user_id').subscribe((data) => {
      this.storageService.userId = data;
      this.populateBoards(data);
    });
  }

  logout() {
    this.storage.clear().subscribe(() => {
      this.router.navigateByUrl('');
    });
    this.storageService.userId = '';
  }

  viewBoard(board, location) {
    this.storageService.boardObj = board;
    this.router.navigate([location + '/' + board.board_id + '/'], { relativeTo: this.route });
  }

  addBoard(name, description) {
    if (name.length !== 0) {
      this.bServ.addBoard(name, description, this.storageService.userId).subscribe((data) => {
        if (data.response === 'SUCCESS') {
          this.closeModal.nativeElement.click();
          this.populateBoards(this.storageService.userId);
        } else {
          alert('Something went wrong' + data.code);
          this.closeModal.nativeElement.click();

        }
      });
    } else {
      alert('Sorry but board name cannot be empty');
      this.closeModal.nativeElement.click();
    }
    this.boardName.nativeElement.value = '';
    this.boardDescription.nativeElement.value = '';
  }

  populateBoards(uId): void {
    this.bServ.getBoards(uId).subscribe((data) => {
      this.searchableBoards = data;
      this.boards = data;
    });
  }

  searchBoards(ev) {
    // Reset items back to all of the items
    this.searchableBoards = this.boards;
    // set val to the value of the ev target
    const varr = ev.target.value;
    if (varr && varr.trim() !== '') {
      this.searchableBoards = this.searchableBoards.filter((item) => {
        return (item.board_name.toLowerCase().indexOf(varr.toLowerCase()) > -1 ||
          item.board_name.toLowerCase().indexOf(varr.toLowerCase()) > -1);
      });
    }

    if (this.searchableBoards.length === 0) {
      this.noBoardsFound = true;
    } else {
      this.noBoardsFound = false;
    }
  }
}
