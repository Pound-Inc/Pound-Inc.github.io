import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from '../../admin/services/program.service';
import { TrainingProgram } from '../../model/training-program.model';
import { UserService } from '../../admin/services/user.service';
import { Coach } from '../../model/coach.model';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { Order } from 'src/app/model/order.model';
import { OrderService } from 'src/app/admin/services/order.service';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit, OnDestroy {
  public programs: TrainingProgram[];
  public coaches: Coach[];
  public users: User[];
  public orders: Order[];
  public plans: ProgramPlan[];

  private programsSubscription: Subscription;
  private coachesSubscription: Subscription;
  private ordersSubscription: Subscription;
  private plansSubscription: Subscription;

  constructor(
    private userService: UserService,
    private programService: ProgramService,
    private plansService: PlanService,
    private orderService: OrderService
  ) {}
  async ngOnInit(): Promise<void> {
    await this.userService.getUsers();
    this.programs =await this.programService.getPrograms();
    this.orders = await this.orderService.getOrders();
    this.plans = await this.plansService.getPlans();

    this.programsSubscription = this.programService.programs$.subscribe(
      (programs: TrainingProgram[]) => {
        this.programs = programs;
      }
    );
    this.coachesSubscription = this.userService.users$.subscribe(
      (users: any[]) => {
        this.users = users;
        this.coaches = users.filter((user: User) => user.roles.Worker);
      }
    );

    this.plansSubscription = this.plansService.plans$.subscribe(
      (plans: ProgramPlan[]) => {
        this.plans = plans;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.programsSubscription) {
      this.programsSubscription.unsubscribe();
    }
    if (this.coachesSubscription) {
      this.coachesSubscription.unsubscribe();
    }
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }
    if (this.plansSubscription) {
      this.plansSubscription.unsubscribe();
    }
  }

  public getRelatedPrograms(coachId: string): TrainingProgram[] | undefined {
    return this.programs
      ? this.programs.filter((program) => program.coach_id === coachId)
      : undefined;
  }
  public getRelatedPlans(programId: string): ProgramPlan[] | undefined {
    return this.plans
      ? this.plans.filter((plan) => plan.program_id === programId)
      : undefined;
  }
  public getRelatedOrders(coachId: string) {
    let orders: Order[] = [];
    const relatedPrograms = this.programs.filter((p) => p.coach_id === coachId);
    for (const program of relatedPrograms) {
      const relatedPlans = this.plans.filter(
        (p) => p.program_id === program._id
      );


      for (const plan of relatedPlans) {
        const relatedOrders = this.orders.filter(
          (o) => o.items[0]._id === plan._id
        );


        orders = [...orders, ...relatedOrders];
      }
    }


    return orders;
  }

  public getRelatedUsers(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user._id === userId)
      : undefined;
  }

  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }

  public cutDescription(coachDesc: string) {
    const maxLength = 80;

    if (coachDesc.length > maxLength) {
      const truncatedDesc = coachDesc.substring(0, maxLength);
      const lastSpaceIndex = truncatedDesc.lastIndexOf(' ');

      if (lastSpaceIndex !== -1) {
        return {
          isLong: true,
          desc: truncatedDesc.substring(0, lastSpaceIndex),
        };
      }
    }

    return { isLong: false, desc: coachDesc };
  }
}
