import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(private location: Location, private formBuilder: FormBuilder, private auth: AuthService) {
    this.signupForm = this.formBuilder.group({
      first_name: [
        ''
      ],
      last_name: [
        ''
      ],
      email: [
        ''
      ],
      username: [
        ''
      ],
      password: [
        ''
      ]
    });
  }

  ngOnInit() {}

  signupClick() {
    const signupData = this.signupForm.value;
    this.auth.signup(signupData).subscribe((data) => {
      console.log(data);
    });
    console.log(signupData);
  }

  goToHomePage() {
    this.location.back();
  }
}
