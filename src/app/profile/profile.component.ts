import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  username: { name: '' };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      const user: any = data['user'];
      this.username = user;
    });
  }
}
