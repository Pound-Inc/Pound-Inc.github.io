import { Component, Input } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';

@Component({
  selector: 'app-coach-experiences',
  templateUrl: './coach-experiences.component.html',
  styleUrls: ['./coach-experiences.component.scss'],
})
export class CoachExperiencesComponent {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
}
