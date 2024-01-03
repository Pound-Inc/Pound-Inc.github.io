import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { ReceiptService } from 'src/app/admin/services/receipt.service';
import { UserService } from 'src/app/admin/services/user.service';
import { Coach } from 'src/app/model/coach.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-landing-top-coaches',
  templateUrl: './landing-top-coaches.component.html',
  styleUrls: ['./landing-top-coaches.component.scss'],
})
export class LandingTopCoachesComponent implements OnInit, OnDestroy {
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
  async ngOnInit(): Promise<void> {
    this.plans = (await this.plansService.getPlans()).data;

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
    let receipts: any[] = [];
    const relatedPrograms = this.programs.filter((p) => p.coach_id === coachId);
    for (const program of relatedPrograms) {
      const relatedPlans = this.plans.filter(
        (p) => p.program_id === program._id
      );
      for (const plan of relatedPlans) {
        const relatedReceipts = this.receipts.filter(
          (r) => r.plan_id === plan._id
        );
        receipts = [...receipts, ...relatedReceipts];
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
