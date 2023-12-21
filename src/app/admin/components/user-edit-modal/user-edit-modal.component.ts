import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateAdapter,
  NgbCalendar,
} from '@ng-bootstrap/ng-bootstrap';
import { Gender, User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss'],
})
export class UserEditModalComponent {
  @Input() user: any;
  @Output() saveChanges = new EventEmitter<User>();
  closeResult: string;
  public gender = {
    male: Gender.Male,
    female: Gender.Female,
  };
  constructor(private modalService: NgbModal) {}

  onSaveChanges() {
    this.saveChanges.emit(this.user);
    this.modalService.dismissAll();
  }
}
