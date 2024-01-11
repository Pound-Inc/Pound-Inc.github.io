import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProgramService } from '../../services/program.service';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { BillingService } from '../../services/billing.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { Order } from '@stripe/stripe-js';
import { Billing } from 'src/app/model/billing.model';
import { WorkerDashboardComponent } from '../worker-dashboard/worker-dashboard.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent implements OnInit {
  public translateBaseRoute = 'routing.admin.dashboard.';
  public users: User[];
  public orders: Order[];
  public billings: Billing[];
  @Output() myEvent = new EventEmitter();

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private billingService: BillingService
  ) {
    document.dir = 'ltr';
  }
  async ngOnInit(): Promise<void> {
    this.users = (await this.userService.getUsers()).data;
    this.orders = (await this.orderService.getOrders()).data || [];
    // this.billings = (await this.billingService.getBillings()).data;
  }
}
