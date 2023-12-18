import {
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { userTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { User, UserRoles } from 'src/app/model/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  public translateBaseRoute = 'routing.admin.dashboard.user.';
  public columns: DataGridColumn[] = userTableColumns;
  public users$: Observable<User[]>;
  public total$: Observable<number>;
  public selectedCountry: any;
  public queriedData: User[] = [];
  public UserRoles = UserRoles;
  private modalService = inject(NgbModal);

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public userService: UserService) {
    this.users$ = userService.users;
    this.total$ = userService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.userService.sortColumn = column;
    this.userService.sortDirection = direction;
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
  // Track the expanded state of each row
  expandedRows: Set<string> = new Set<string>();

  // Function to check if the details for a row are expanded
  isDetailsExpanded(programId: string): boolean {
    return this.expandedRows.has(programId);
  }

  // Function to toggle the expanded state of a row
  toggleDetails(programId: string): void {
    if (this.expandedRows.has(programId)) {
      this.expandedRows.delete(programId);
    } else {
      this.expandedRows.add(programId);
    }
  }

  // Function to get the details content for a row
  getDetailsContent(program: any): string {
    // Customize this function to return the details content based on your data structure
    return JSON.stringify(program.phases);
  }

  onRowClick(country: any) {
    this.selectedCountry = country;
    this.queriedData = [this.selectedCountry];
    // Handle the row click event here
    // You can log the data or perform any other action
    console.log('Row clicked:', country);

    // If you want to convert the data to JSON
    const jsonData = JSON.stringify(country);
    console.log('Row data as JSON:', jsonData);
  }
  editRow() {
    // Handle the edit button click
    if (this.selectedCountry) {
      // Implement logic to open an edit form or perform other edit actions
      console.log('Edit button clicked for:', this.selectedCountry);
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

  deleteRow() {}
}