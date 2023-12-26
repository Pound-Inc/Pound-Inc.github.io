import { Component, Input, OnInit } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';
import { ProgramStory } from 'src/app/model/story.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-customers-story',
  templateUrl: './customers-story.component.html',
  styleUrls: ['./customers-story.component.scss'],
})
export class CustomersStoryComponent implements OnInit {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
  @Input() relatedStories: ProgramStory[];
  @Input() relatedPrograms: TrainingProgram[];
  @Input() relatedUsers: User[];
  constructor() {}

  ngOnInit(): void {
    console.log(this.relatedStories);
  }

  public getRelatedUsers(userId: string): User | undefined {
    return this.relatedUsers
      ? this.relatedUsers.find((user) => user._id === userId)
      : undefined;
  }
}
