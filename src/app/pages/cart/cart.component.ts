import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillingService } from 'src/app/admin/services/billing.service';
import { OrderService } from 'src/app/admin/services/order.service';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Addon } from 'src/app/model/addon.model';
import { Billing } from 'src/app/model/billing.model';
import { Cart } from 'src/app/model/cart.model';
import { Order, OrderStatusEnum } from 'src/app/model/order.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { PaymentComponent } from 'src/app/modules/payment/payment.component';
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
  private billing: Billing[];

  constructor(
    private planService: PlanService,
    private programService: ProgramService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
    private billingService: BillingService
  ) {}
  async ngOnInit(): Promise<void> {
    this.authService.getProfile().then((user) => {
      this.user = user;
    });

    const userCart = localStorage.getItem('cart') as string;
    const cart: Cart = JSON.parse(userCart);
    if (cart) {
      const plans: ProgramPlan[] = await this.planService.getPlans();
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
          this.payBtn = false;
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

  private setBillingArray() {
    const BILLING_ADDONS: Billing[] = [];
    const BILLING_ITEM: Billing = {
      name: this.main.name,
      description: this.main.description,
      price: this.main.price,
    };
    for (const addon of this.userAddons) {
      const billingAddon: Billing = {
        name: addon.name,
        description: addon.description,
        price: addon.price,
      };

      BILLING_ADDONS.push(billingAddon);
    }

    this.billing = [BILLING_ITEM, ...BILLING_ADDONS];
  }

  getTotalAmountIncVat() {
    const totalExtVAT = this.total.addons + this.total.main;
    const totalIncVAT = totalExtVAT * this.VAT;
    return totalIncVAT;
  }

  setBilling() {
    this.payBtn = true;
    this.setBillingArray();

    this.orderService
      .setBilling(this.billing)
      .then((response) => {
        const clientSecret: string = response.data;
        const modalRef = this.modalService.open(PaymentComponent, {
          size: 'md',
          backdrop: 'static',
          keyboard: false,
        });

        modalRef.componentInstance.clientSecret = clientSecret;
        modalRef.componentInstance.billing = this.billing;
        modalRef.componentInstance.amount = this.getTotalAmountIncVat();
        this.payBtn = false;
      })
      .catch((error) => {});
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

    this.orderService.createNewOrder(newOrder).then((response: any) => {
      console.log(response);
      
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
