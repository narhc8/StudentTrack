import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
})
export class BoardsComponent implements OnInit {
  boards = ['Board 1', 'Board 2'];

  constructor() {
    this.populateBoards();
  }

  ngOnInit(): void {}

  viewBoard(board: string) {
    alert('Opening board ' + board);
  }

  populateBoards(): void {}
}
