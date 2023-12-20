import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProgramService } from '../../admin/services/program.service';
import { TrainingProgram } from '../../model/training-program.model';
import { UserService } from '../../admin/services/user.service';
import { UserRole } from '../../model/user.model';
import { Coach } from '../../model/coach.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrls: ['./coaches.component.scss'],
})
export class CoachesComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.coach.';
  public programs: TrainingProgram[] = [];
  private coaches: Coach[] = [];

  private programSubscription: Subscription;
  private coachesSubscription: Subscription;

  constructor(
    private programService: ProgramService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.programSubscription = this.programService.programs.subscribe(
      (programs: TrainingProgram[]) => {
        this.programs = programs;
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
  }

  public getRelatedCoach(coachId: string): Coach | undefined {
    return this.coaches
      ? this.coaches.find((coach) => coach.id === coachId)
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
