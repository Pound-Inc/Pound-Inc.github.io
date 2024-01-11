import {
  Component,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChildren,
  inject,
} from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { ProgramService } from '../../services/program.service';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { programTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'src/common/interfaces/table.interface';
import { PlanService } from '../../services/plan.service';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss'],
})
export class ProgramTableComponent implements OnInit {
  public translateBaseRoute = 'routing.admin.dashboard.program.';

  public columns: DataGridColumn[] = programTableColumns;
  public programs$: TrainingProgram[];
  public users$: User[];
  public total$: Observable<number>;
  public selectedRow: any;
  private modalService = inject(NgbModal);

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private programService: ProgramService,
    private planService: PlanService,
    private userService: UserService
  ) {}
  async ngOnInit(): Promise<void> {
    this.programs$ = await this.programService.getPrograms();
    this.users$ = await this.userService.getUsers();
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

  getRelatedUser(userId: string) {
    return this.users$.find((u) => u._id === userId);
  }

  deleteRow() {}
}
