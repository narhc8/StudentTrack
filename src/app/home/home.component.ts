import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    this.auth.testNodeServer().subscribe((data) => {
      console.log(data);
    });
  }

  homeButtonClick(location) {
    this.router.navigate([location + '/'], {relativeTo: this.route});
  }

}
