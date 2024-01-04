import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProgramService } from '../../services/program.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  public translateBaseRoute = 'routing.admin.dashboard.';
  constructor(private orderService: OrderService) {
    document.dir = 'ltr';
  }
  apicheck() {
    this.orderService.getOrders();
  }
}
