import { Component, OnInit } from '@angular/core';
import { CreateProgramModalComponent } from './create-program-modal/create-program-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Coach } from 'src/app/model/coach.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { Order } from 'src/app/model/order.model';
import { OrderService } from '../../services/order.service';
import { ProgramService } from '../../services/program.service';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-worker-dashboard',
  templateUrl: './worker-dashboard.component.html',
  styleUrls: ['./worker-dashboard.component.scss'],
})
export class WorkerDashboardComponent implements OnInit {
  public coach: Coach;
  public programs: TrainingProgram[] = [];
  public orders: Order[] = [];
  public sells: number = 0;
  constructor(
    private modalService: NgbModal,
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService,
    private programService: ProgramService,
    private billingService: BillingService
  ) {
    document.dir = 'ltr';
  }

  async ngOnInit(): Promise<void> {
    this.authService
      .getProfile()
      .then((coach) => {
        this.coach = coach as Coach;
      })
      .then(async () => {
        this.programs = (await this.programService.getPrograms()).filter(
          (p) => p.coach_id === this.coach._id
        );
      })
      .then(() => {
        for (const program of this.programs) {
          this.orderService.getOrdersByProgramId(program._id).then((orders) => {
            this.orders = [...this.orders, ...orders];
            if (this.programs.length - 1 === this.programs.indexOf(program)) {
              this.getBillingsByOrderIds();
            }
          });
        }
      });
  }

  async getBillingsByOrderIds() {
    const orderIds = this.orders.map((o) => o._id);
    const billings = await this.billingService.getBillingsByOrderIds(orderIds);
    let sells = 0;

    for (const billing of billings) {
      sells += billing.collected;
    }
    this.sells = sells / 100;
  }
  openCreateProgramModal() {
    const modalRef = this.modalService.open(CreateProgramModalComponent, {
      size: 'xl',
    });

    modalRef.componentInstance.coach = this.coach;
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/']);
  }
}
