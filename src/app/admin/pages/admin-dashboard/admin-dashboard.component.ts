import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { BillingService } from '../../services/billing.service';
import { User } from 'src/app/model/user.model';
import { Billing } from 'src/app/model/billing.model';
import { Order } from 'src/app/model/order.model';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public translateBaseRoute = 'routing.admin.dashboard.';
  public users: User[] = [];
  public orders: Order[] = [];
  public billings: Billing[] = [];

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private billingService: BillingService
  ) {
    document.dir = 'ltr';
  }
  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
    this.orders = await this.orderService.getOrders();
    // this.billings = (await this.billingService.getBillings()).data;
  }

  api() {
    this.orderService.createNewOrder({});
  }
}
