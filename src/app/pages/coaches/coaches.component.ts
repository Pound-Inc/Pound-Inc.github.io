import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from '../../admin/services/program.service';
import { TrainingProgram } from '../../model/training-program.model';
import { UserService } from '../../admin/services/user.service';
import { Coach } from '../../model/coach.model';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ReceiptService } from 'src/app/admin/services/receipt.service';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit, OnDestroy {
  public programs: TrainingProgram[];
  public coaches: Coach[];
  public users: User[];
  public receipts: Receipt[];
  public plans: ProgramPlan[];

  private programsSubscription: Subscription;
  private coachesSubscription: Subscription;
  private receiptsSubscription: Subscription;
  private plansSubscription: Subscription;

  constructor(
    private userService: UserService,
    private programService: ProgramService,
    private receiptService: ReceiptService,
    private plansService: PlanService
  ) {}
  ngOnInit(): void {
    this.programsSubscription = this.programService.programs.subscribe(
      (programs: TrainingProgram[]) => {
        this.programs = programs;
      }
    );
    this.coachesSubscription = this.userService.users.subscribe(
      (users: any[]) => {
        this.users = users;
        this.coaches = users.filter((user: User) => user.roles.Worker);
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

  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }
}
