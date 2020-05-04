import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StudentTrack';
  constructor(router: Router, private localStorage: StorageMap) {
    this.localStorage.get('user_id').subscribe((data) => {
      if (data === undefined) {
        router.navigateByUrl('');
      } else {
        router.navigateByUrl('home/boards');
      }
    });
  }
}

