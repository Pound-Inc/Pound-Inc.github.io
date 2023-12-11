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
}
