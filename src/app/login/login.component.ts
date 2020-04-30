import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loggingInUser = false;
  passwordWrong = false;

  unknownError = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private auth: AuthService
    ) {
      this.loginForm = this.formBuilder.group({
        username: [
          ''
        ],
        password: [
          ''
        ]
      });
    }

  ngOnInit() {
  }

  loginClick() {
    this.loggingInUser = true;
    const loginData = this.loginForm.value;
    this.auth.login(loginData).subscribe((data) => {
      if (data.code === 1001) {
        console.log('User password is correct');
        this.router.navigateByUrl('home/boards');
      } else if (data.code === 1002) {
        console.log('User is incorrect');
        this.passwordWrong = true;
      } else {
        console.log('unknown error');
        this.unknownError = true;
      }
      console.log(data);
    });
  }

  dismiss(type) {
    if (type === 'password') {
      this.passwordWrong = false;
    } else if (type === 'error') {
      this.unknownError = false;
    }
  }

  goToSignupPage(location) {
    this.router.navigateByUrl('home/' + location, {relativeTo: this.route});
  }

}
