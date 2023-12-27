import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss'],
})
export class UserProfileModalComponent {
  @Input() user: User;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendDataAndCloseModal() {
    this.closeModal.emit(true);
  }
}
