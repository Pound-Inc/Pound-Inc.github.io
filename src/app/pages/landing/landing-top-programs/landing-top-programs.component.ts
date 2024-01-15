import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlanService } from 'src/app/admin/services/plan.service';
import { ProgramService } from 'src/app/admin/services/program.service';
import { UserService } from 'src/app/admin/services/user.service';
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

  constructor(
    private programService: ProgramService,
    private planService: PlanService,
    private userService: UserService
  ) {}

  async ngOnInit(): Promise<void> {
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
