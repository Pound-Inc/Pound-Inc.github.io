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
  @Input() coach: Coach;
  @Input() relatedStories: ProgramStory[];
  @Input() relatedPrograms: TrainingProgram[];
  @Input() relatedUsers: User[];
  constructor() {}

  ngOnInit(): void {}

  getRelatedUser(userId: any) {
    return this.relatedUsers.find((u) => u._id === userId);
  }

  public cutDescription(desc: string) {
    const maxLength = 80;

    if (desc.length > maxLength) {
      const truncatedDesc = desc.substring(0, maxLength);
      const lastSpaceIndex = truncatedDesc.lastIndexOf(' ');

      if (lastSpaceIndex !== -1) {
        return {
          isLong: true,
          desc: truncatedDesc.substring(0, lastSpaceIndex),
        };
      }
    }

    return { isLong: false, desc: desc };
  }
}
