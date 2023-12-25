import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { userTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { RoleEnum, RoleType, User } from 'src/app/model/user.model';
import { UserService } from '../../services/user.service';
import { Coach } from 'src/app/model/coach.model';
import { UserEditModalComponent } from '../user-edit-modal/user-edit-modal.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.admin.dashboard.user.';
  public columns: DataGridColumn[] = userTableColumns;
  public users: User[];
  public total$: Observable<number>;
  public selectedRow: User;
  public UserRoles = RoleEnum;
  private modalService = inject(NgbModal);
  private userSubscription: Subscription;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public userService: UserService) {}
  ngOnInit(): void {
    this.userSubscription = this.userService.users.subscribe(
      (users: User[] | Coach[]) => {
        this.users = users;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  formatValue(value: any) {
    if (value === null || value === undefined) {
      return '';
    } else if (typeof value === 'object') {
      return Object.keys(value);
    } else {
      return value.toString();
    }
  }

  onRowClick(user: User) {
    this.selectedRow = user;
  }
  editRow() {
    if (this.selectedRow) {
      console.log('Edit button clicked for:', this.selectedRow);
    }
  }

  open(content: TemplateRef<any>) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  openEditModal(user: User) {
    this.selectedRow = { ...user };
    const modalRef = this.modalService.open(UserEditModalComponent);
    const correctData = {
      ...user,
      dob: {
        year: user.dob.substring(0, user.dob.indexOf('-')),
        month: user.dob.substring(
          user.dob.indexOf('-') + 1,
          user.dob.lastIndexOf('-')
        ),
        day: user.dob.substring(user.dob.lastIndexOf('-') + 1, user.dob.length),
      },
    };
    modalRef.componentInstance.user = correctData;

    modalRef.componentInstance.saveChanges.subscribe((updatedUser: User) => {
      console.log(updatedUser);
    });
  }
  onSaveChanges(asd: any) {}

  deleteRow() {}
  newRow() {}

  getHighestRole(roles: any) {
    let highestRole = null;
    for (const role in roles) {
      if (roles[role] === true) {
        highestRole = role;
        break;
      }
    }
    return highestRole;
  }
}
