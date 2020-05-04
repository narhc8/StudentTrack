import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
    private storageService: StorageService,
    private auth: AuthService,
    private storage: StorageMap
  ) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    });
  }

  ngOnInit() {}

  loginClick() {
    this.loggingInUser = true;
    const loginData = this.loginForm.value;
    this.auth.login(loginData).subscribe((data2) => {
      if (data2.code === 1001) {
        console.log('User password is correct');
        this.loggingInUser = false;
        console.log(data2);
        this.storage
          .set('user_id', data2.user.user_id)
          .subscribe((data) => {
            console.log(data2.user);
            this.router.navigateByUrl('home/boards');
            this.storageService.userId = data2.user.user_id;
            this.storageService.firstname = data2.user.first_name;
            // this.storage.set('user', data2.user.first_name);
          });
      } else if (data2.code === 1002) {
        console.log('User password is incorrect');
        this.passwordWrong = true;
        this.loggingInUser = false;
      } else {
        console.log('unknown error');
        this.unknownError = true;
        this.loggingInUser = false;
      }
      console.log(data2);
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
    this.router.navigateByUrl('home/' + location, { relativeTo: this.route });
  }
}
