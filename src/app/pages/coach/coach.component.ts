import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coach } from '../../model/coach.model';
import { Subscription } from 'rxjs';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { ReceiptService } from 'src/app/admin/services/receipt.service';
import { UserService } from 'src/app/admin/services/user.service';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.scss'],
})
export class CoachComponent implements OnInit, OnDestroy {
  translateBaseRoute = 'routing.coach.';
  public coach: Coach;
  public programs: TrainingProgram[];
  public users: User[];
  public receipts: Receipt[];
  public plans: ProgramPlan[];

  private routeSubscription: Subscription;
  private programsSubscription: Subscription;
  private coachesSubscription: Subscription;
  private receiptsSubscription: Subscription;
  private plansSubscription: Subscription;
  private usersSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private programService: ProgramService,
    private receiptService: ReceiptService,
    private plansService: PlanService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe((data) => {
      this.coach = data['coach'];
    });

    this.programsSubscription = this.programService.programs.subscribe(
      (programs: TrainingProgram[]) => {
        this.programs = programs;
      }
    );
    this.usersSubscription = this.userService.users.subscribe(
      (users: any[]) => {
        this.users = users;
      }
    );

    this.receiptsSubscription = this.receiptService
      .getReceipts()
      .subscribe((receipts: Receipt[]) => {
        this.receipts = receipts;
      });
    this.plansSubscription = this.plansService.plans.subscribe(
      (plans: ProgramPlan[]) => {
        this.plans = plans;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.programsSubscription) {
      this.programsSubscription.unsubscribe();
    }
    if (this.coachesSubscription) {
      this.coachesSubscription.unsubscribe();
    }
    if (this.receiptsSubscription) {
      this.receiptsSubscription.unsubscribe();
    }
    if (this.plansSubscription) {
      this.plansSubscription.unsubscribe();
    }
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {}

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
  public getRelatedReceipts(coachId: string): Receipt[] {
    let receipts: Receipt[] = [];
    const relatedPrograms = this.getRelatedPrograms(coachId);
    if (relatedPrograms) {
      for (const program of relatedPrograms) {
        const relatedPlans = this.getRelatedPlans(program._id);
        if (relatedPlans)
          for (const plan of relatedPlans) {
            const receipt = this.receipts.find(
              (receipt) => receipt.plan_id === plan._id
            );
            if (receipt) {
              receipts.push(receipt);
            }
          }
      }
    }
    return receipts;
  }

  public getRelatedUsers(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user._id === userId)
      : undefined;
  }
}
