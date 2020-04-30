import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  creatingUser = false;

  userSignedUp = false;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {
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
    this.creatingUser = true;
    const signupData = this.signupForm.value;
    this.auth.signup(signupData).subscribe((data) => {
      if (data.response === 'SUCCESS') {
        console.log('User has been sucessfully registered');
        this.creatingUser = false;
        this.userSignedUp = true;
      }
    });
    console.log(signupData);
  }

  goToLogin(location) {
    this.userSignedUp = false;
    this.router.navigateByUrl('home/' + location, {relativeTo: this.route});
  }

  goToHomePage() {
    this.location.back();
  }
}
