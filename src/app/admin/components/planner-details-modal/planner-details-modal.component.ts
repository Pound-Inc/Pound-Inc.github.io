import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-planner-details-modal',
  templateUrl: './planner-details-modal.component.html',
  styleUrls: ['./planner-details-modal.component.scss'],
})
export class PlannerDetailsModalComponent {
  @Input() exercises: any;
}
