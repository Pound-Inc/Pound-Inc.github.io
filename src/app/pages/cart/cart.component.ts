import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { OrderService } from 'src/app/admin/services/order.service';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Addon } from 'src/app/model/addon.model';
import { Cart } from 'src/app/model/cart.model';
import { Order, OrderStatusEnum } from 'src/app/model/order.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { addons } from 'src/common/constants/addons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public translateBaseRoute = 'routing.program.';
  public main: ProgramPlan;
  public addons = addons;
  public userAddons: Addon[];
  public valid: boolean = false;
  public program: TrainingProgram;
  public user: User;
  public VAT: number = 1.25;
  public payBtn: boolean = true;
  public total: { addons: number; main: number } = { main: 0, addons: 0 };

  constructor(
    private planService: PlanService,
    private programService: ProgramService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}
  async ngOnInit(): Promise<void> {
    this.authService.getCurrentUser.subscribe((user) => {
      this.user = user;
    });

    const userCart = localStorage.getItem('cart') as string;
    const cart: Cart = JSON.parse(userCart);
    if (cart) {
      const plans: ProgramPlan[] = (await this.planService.getPlans()).data;
      const main = plans.find(
        (p) => p._id === cart.main._id && p.price === cart.main.price
      );
      if (main) {
        this.main = main;
        let valid = true;
        for (const addon of Object.keys(this.addons) as []) {
          const validateAddonsPrice =
            this.addons[addon].price !== addons[addon].price;
          if (validateAddonsPrice) {
            valid = false;
          }
        }
        if (valid) {
          this.userAddons = cart.addons;

          this.total = {
            main: main.price,
            addons: this.getTotalAmount(cart.addons),
          };
          const program = await this.programService.getProgramById(
            main.program_id
          );
          this.program = program;

          this.valid = true;
        }
      }
    } else {
      this.router.navigate(['/']);
    }
  }
  getTotalAmount(addons: Addon[]): number {
    let totalAmount = 0;
    addons.forEach((addon) => {
      if (addon.selected) {
        totalAmount += addon.price;
      }
    });

    return totalAmount;
  }

  getTotalAmountIncVat() {
    const totalExtVAT = this.total.addons + this.total.main;
    const totalIncVAT = totalExtVAT * this.VAT;
    return totalIncVAT;
  }

  async onPurchase() {
    this.payBtn = false;
    const total = this.total.addons + this.total.main;
    const newOrder = {
      user_id: this.user._id,
      items: [this.main],
      addons: this.userAddons,
      price: total,
      status: OrderStatusEnum.New,
    };

    //todo: confirmation page.
    await this.orderService.createNewOrder(newOrder).then((response: any) => {
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
