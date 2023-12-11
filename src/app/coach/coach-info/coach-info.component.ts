import { Component, Input } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';

@Component({
  selector: 'app-coach-info',
  templateUrl: './coach-info.component.html',
  styleUrls: ['./coach-info.component.scss'],
})
export class CoachInfoComponent {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
}
