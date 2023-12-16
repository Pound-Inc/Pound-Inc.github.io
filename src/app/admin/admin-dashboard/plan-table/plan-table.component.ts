import {
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { planTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.scss'],
})
export class PlanTableComponent {
  public translateBaseRoute = 'routing.admin.dashboard.plan.';
  public columns: DataGridColumn[] = planTableColumns;
  public plans$: Observable<ProgramPlan[]>;
  public total$: Observable<number>;
  public selectedCountry: any;
  public queriedData: ProgramPlan[] = [];
  private modalService = inject(NgbModal);

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public planService: PlanService) {
    this.plans$ = planService.plans;
    this.total$ = planService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.planService.sortColumn = column;
    this.planService.sortDirection = direction;
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
