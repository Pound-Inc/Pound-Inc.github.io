import { Component, Input } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';

@Component({
  selector: 'app-customers-story',
  templateUrl: './customers-story.component.html',
  styleUrls: ['./customers-story.component.scss'],
})
export class CustomersStoryComponent {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
  clientStories: any;
  constructor() {
    this.clientStories = [
      {
        story_id: '00912939',
        program_id: '',
        user_id: '4441444',
        title: 'قصة سارة',
        description: 'من الصفر للقمة',
        imgs: [
          'https://picsum.photos/1920/1080?random=4',
          'https://picsum.photos/1920/1080?random=5',
        ],
        date: new Date().toLocaleDateString(),
      },

      {
        story_id: '00912939',
        program_id: '',
        user_id: '4441444',
        title: 'قصة احمد',
        description: 'من الصفر للقمة',
        imgs: [
          'https://picsum.photos/1920/1080?random=6',
          'https://picsum.photos/1920/1080?random=7',
        ],
        date: new Date().toLocaleDateString(),
      },
    ];
  }
}
