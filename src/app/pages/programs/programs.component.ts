import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgramService } from '../../admin/services/program.service';
import { UserService } from '../../admin/services/user.service';
import { Coach } from '../../model/coach.model';
import { TrainingProgram } from '../../model/training-program.model';
import { PlanService } from '../../admin/services/plan.service';
import { ProgramPlan } from '../../model/program-plan.model';
import { RoleEnum, User } from 'src/app/model/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss'],
})
export class ProgramsComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.coach.';
  public programs: TrainingProgram[] = [];
  public plans: ProgramPlan[] = [];
  public users: User[];

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.data.subscribe((data) => {
      const programData: {
        users: User[];
        programs: TrainingProgram[];
        plans: ProgramPlan[];
      } = data['programs'];

      this.programs = programData.programs;
      this.users = programData.users;
      this.plans = programData.plans;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

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
