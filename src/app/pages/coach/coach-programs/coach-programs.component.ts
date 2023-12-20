import { Component, Input } from '@angular/core';
import { Coach } from 'src/app/model/coach.model';

@Component({
  selector: 'app-coach-programs',
  templateUrl: './coach-programs.component.html',
  styleUrls: ['./coach-programs.component.scss'],
})
export class CoachProgramsComponent {
  @Input() translateBaseRoute: string;
  @Input() coach: Coach;
}
