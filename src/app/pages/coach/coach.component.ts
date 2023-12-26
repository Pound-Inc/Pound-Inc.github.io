import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Coach } from '../../model/coach.model';
import { Subscription } from 'rxjs';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { Receipt } from 'src/app/model/receipt.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { ProgramStory } from 'src/app/model/story.model';

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
  public stories: ProgramStory[];

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSubscription = this.route.data.subscribe((data) => {
      const programData: {
        coach: Coach;
        programs: TrainingProgram[];
        users: User[];
        plans: ProgramPlan[];
        receipts: Receipt[];
        stories: ProgramStory[];
      } = data['coach'];

      this.coach = programData.coach;
      this.programs = programData.programs;
      this.users = programData.users;
      this.receipts = programData.receipts;
      this.plans = programData.plans;
      this.stories = programData.stories;
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {}

  public getRelatedUsers(userId: string): User | undefined {
    return this.users
      ? this.users.find((user) => user._id === userId)
      : undefined;
  }
}
