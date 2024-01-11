import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserProfileModalComponent } from './user-profile-modal/user-profile-modal.component';
import { User } from 'src/app/model/user.model';
import { Order } from 'src/app/model/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  public translateBaseRoute = 'routing.admin.dashboard.';
  private user: User;
  private orders: Order[];

  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getProfile().then(async (user: User) => {
      this.user = user;
      const userOrders = await this.orderService.getRelatedOrders(
        this.user._id
      );
      this.orders = userOrders;
    });
  }

  openUserOrders() {
    const modalRef = this.modalService.open(UserOrdersComponent, {
      size: 'md',
    });
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.orders = this.orders;

    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

  openUserProfile() {
    const modalRef = this.modalService.open(UserProfileModalComponent, {
      size: 'md',
    });

    modalRef.componentInstance.user = this.user;

    modalRef.componentInstance.closeModal.subscribe(() => {
      modalRef.close();
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
