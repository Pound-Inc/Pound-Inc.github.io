import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../admin/services/program.service';
import { UserService } from '../../admin/services/user.service';
import { Coach } from '../../model/coach.model';
import { TrainingProgram } from '../../model/training-program.model';
import { UserRole } from '../../model/user.model';
import { PlanService } from '../../admin/services/plan.service';
import { ProgramPlan } from '../../model/program-plan.model';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.coach.';
  public programs: TrainingProgram[] = [];
  public plans: ProgramPlan[] = [];
  private coaches: Coach[] = [];

  private programSubscription: Subscription;
  private coachesSubscription: Subscription;
  private plansSubscription: Subscription;

  constructor(
    private programService: ProgramService,
    private userService: UserService,
    private planService: PlanService
  ) {}

  ngOnInit(): void {
    this.programSubscription = this.programService.programs.subscribe(
      (programs: TrainingProgram[]) => {
        this.programs = programs;
      }
    );
    this.plansSubscription = this.planService.plans.subscribe(
      (plans: ProgramPlan[]) => {
        console.log(plans);

        this.plans = plans;
      }
    );
    this.coachesSubscription = this.userService.users.subscribe(
      (users: any[]) => {
        this.coaches = users.filter((user) => user.role === UserRole.Worker);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.programSubscription) {
      this.programSubscription.unsubscribe();
    }
    if (this.coachesSubscription) {
      this.coachesSubscription.unsubscribe();
    }
    if (this.plansSubscription) {
      this.plansSubscription.unsubscribe();
    }
  }

  public getRelatedCoach(coachId: string): Coach | undefined {
    return this.coaches
      ? this.coaches.find((coach) => coach._id === coachId)
      : undefined;
  }
  public getRelatedPlan(programId: string): ProgramPlan | undefined {
    return this.plans
      ? this.plans.find((plan) => plan.program_id === programId)
      : undefined;
  }

  public getColor(value: number): string {
    if (value >= 70) {
      // Light blue
      return '#5da8e1';
    } else if (value >= 40) {
      // Light green
      return '#a4c639';
    } else {
      // Light red
      return '#e57373';
    }
  }
}
