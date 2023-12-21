import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';

@Component({
  selector: 'app-plan-compare-modal',
  templateUrl: './plan-compare-modal.component.html',
  styleUrls: ['./plan-compare-modal.component.scss'],
})
export class PlanCompareModalComponent {
  @Input() program: TrainingProgram;
  @Input() plans: ProgramPlan[];
  @Input() columns: DataGridColumn[];
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendDataAndCloseModal() {
    this.closeModal.emit(true);
  }
}
