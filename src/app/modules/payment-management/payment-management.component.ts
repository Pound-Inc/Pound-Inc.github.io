import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { OrderService } from 'src/app/admin/services/order.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Cart } from 'src/app/model/cart.model';
import { OrderStatusEnum } from 'src/app/model/order.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-payment-management',
  templateUrl: './payment-management.component.html',
  styleUrls: ['./payment-management.component.scss'],
})
export class PaymentManagementComponent implements OnInit {
  private user: User;
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getProfile().then((user) => {
      this.user = user;
      if (user) {
        this.route.queryParams.subscribe(async (params) => {
          // Access the query parameters here
          const paymentIntentClientSecret =
            params['payment_intent_client_secret'];
          const paymentStatus = params['redirect_status'];

          await this.orderService
            .getOrderByClientSecret(paymentIntentClientSecret)
            .then(async (response) => {
              if (response) {
                // this.router.navigate(['/']);
              } else {
                if (paymentStatus === 'succeeded') {
                  const cartData: Cart = JSON.parse(
                    localStorage.getItem('cart') as string
                  );

                  const amount = this.calculateAmount(cartData);
                  const order = this.setNewOrder(
                    cartData,
                    amount,
                    this.user._id,
                    paymentIntentClientSecret
                  );

                  this.orderService.createNewOrder(order).then((response) => {
                    if (response) {
                      const navigationExtras: NavigationExtras = {
                        state: {
                          orderData: response,
                        },
                      };

                      this.router.navigate(['/invoice'], navigationExtras);
                    }
                  });
                }
              }
            });
        });
      }
    });
  }

  calculateAmount(cart: Cart) {
    let amount = 0;
    for (const addon of cart.addons) {
      amount += addon.price;
    }

    amount += cart.main.price;
    return amount;
  }

  setNewOrder(
    cart: Cart,
    amount: number,
    userId: string,
    clientSecret: string
  ) {
    return {
      user_id: userId,
      items: [cart.main],
      addons: cart.addons,
      price: amount,
      status: OrderStatusEnum.New,
      client_secret: clientSecret,
    };
  }
}
