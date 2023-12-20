import {
  Component,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { ProgramService } from '../../services/program.service';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { programTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'src/common/interfaces/table.interface';
import { PlanService } from '../../services/plan.service';

@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss'],
})
export class ProgramTableComponent {
  public translateBaseRoute = 'routing.admin.dashboard.program.';

  public columns: DataGridColumn[] = programTableColumns;
  public programs$: Observable<TrainingProgram[]>;
  public total$: Observable<number>;
  public selectedRow: any;
  private modalService = inject(NgbModal);
  public tableConfig: Table;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private programService: ProgramService,
    private planService: PlanService
  ) {
    this.programs$ = this.programService.programs;
    this.total$ = this.programService.total$;
    this.tableConfig = this.programService._state;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.tableConfig.sortColumn = column;
    this.tableConfig.sortDirection = direction;
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

  onRowClick(rowData: TrainingProgram) {
    this.selectedRow = rowData;

    // -> Observable for Program Plans
    this.planService.setSelectedProgramData(rowData);
  }
  editRow() {}

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
