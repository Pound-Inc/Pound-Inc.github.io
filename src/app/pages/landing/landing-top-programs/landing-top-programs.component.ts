import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/admin/services/order.service';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { UserService } from 'src/app/admin/services/user.service';
import { Order } from 'src/app/model/order.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-landing-top-programs',
  templateUrl: './landing-top-programs.component.html',
  styleUrls: ['./landing-top-programs.component.scss'],
})
export class LandingTopProgramsComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.coach.';
  public programs: TrainingProgram[] = [];
  public plans: ProgramPlan[] = [];
  public users: User[];
  public orders: Order[];

  constructor(
    private programService: ProgramService,
    private planService: PlanService,
    private userService: UserService,
    private orderService: OrderService
  ) {}

  async ngOnInit(): Promise<void> {
    this.orders = await this.orderService.getOrders();
    this.programs = (await this.programService.getPrograms())
      .slice(0, 3)
      .reverse();
    this.plans = await this.planService.getPlans();
    this.users = await this.userService.getUsers();
  }

  ngOnDestroy(): void {}

  public getRelatedCoach(coachId: string): User | undefined {
    return this.users
      ? this.users.find((coach) => coach._id === coachId)
      : undefined;
  }
  public getRelatedPlan(programId: string): ProgramPlan | undefined {
    return this.plans
      ? this.plans.find((plan) => plan.program_id === programId)
      : undefined;
  }

  public getRelatedOrders(programId: string) {
    let orders: any[] = [];
    const relatedPrograms = this.programs.filter((p) => p._id === programId);
    for (const program of relatedPrograms) {
      const relatedPlans = this.plans.filter(
        (p) => p.program_id === program._id
      );

      orders = this.orders.filter((o) => o.items[0].program_id === program._id);
    }

    return orders;
  }

  public getColor(value: number): string {
    if (value >= 70) {
      // Light blue
      return '#c1ddc4';
    } else if (value >= 40) {
      // Light green
      return '#ddd8c1';
    } else {
      // Light red
      return '#ddc1c1';
    }
  }

  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }
}
