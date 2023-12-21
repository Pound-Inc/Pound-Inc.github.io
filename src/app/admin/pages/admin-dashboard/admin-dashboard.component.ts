import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  public translateBaseRoute = 'routing.admin.dashboard.';
  constructor() {
    document.dir = 'ltr';
  }
}
