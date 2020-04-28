import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(private location: Location) {}

  ngOnInit() {}

  signupClick() {}

  goToHomePage() {
    this.location.back();
  }
}
