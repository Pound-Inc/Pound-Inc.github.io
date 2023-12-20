import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgramService } from 'src/app/admin/services/program.service';
import { UserService } from 'src/app/admin/services/user.service';
import { Coach } from 'src/app/model/coach.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User, UserRole } from 'src/app/model/user.model';

@Component({
  selector: 'app-landing-top-coaches',
  templateUrl: './landing-top-coaches.component.html',
  styleUrls: ['./landing-top-coaches.component.scss'],
})
export class LandingTopCoachesComponent implements OnInit, OnDestroy {
  public programs: TrainingProgram[];
  public coaches: Coach[];
  public users: User[];

  private programSubscription: Subscription;
  private coachesSubscription: Subscription;

  constructor(
    private userService: UserService,
    private programService: ProgramService
  ) {}
  ngOnInit(): void {
    this.programSubscription = this.programService.programs.subscribe(
      (programs: TrainingProgram[]) => {
        this.programs = programs;
      }
    );
    this.coachesSubscription = this.userService.users.subscribe(
      (users: any[]) => {
        this.users = users;
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
  }

  public getRelatedPrograms(coachId: string): TrainingProgram[] | undefined {
    return this.programs
      ? this.programs.filter((program) => program.coach_id === coachId)
      : undefined;
  }

  public getRelatedUsers(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user.id === userId)
      : undefined;
  }

  public getStarRange(): number[] {
    return Array.from({ length: 5 }, (_, index) => index);
  }
}
