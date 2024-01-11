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
import { planTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { PlanService } from '../../services/plan.service';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { Table } from 'src/common/interfaces/table.interface';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.scss'],
})
export class PlanTableComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.admin.dashboard.plan.';
  public columns: DataGridColumn[] = planTableColumns;
  public plans$: ProgramPlan[] = [];
  public filteredPlans$: ProgramPlan[] = [];
  public total$: Observable<number>;
  public selectedRow: ProgramPlan | null;
  private modalService = inject(NgbModal);
  private programSubscription: Subscription;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(private planService: PlanService) {}
  async ngOnInit(): Promise<void> {
    this.plans$ = await this.planService.getPlans();

    this.programSubscription = this.planService
      .getSelectedProgramData()
      .subscribe((program: TrainingProgram) => {
        this.selectedRow = null;
        if (program) {
          this.filteredPlans$ = this.plans$.filter(
            (plan) => plan.program_id === program._id
          );
        } else {
          this.filteredPlans$ = this.plans$;
        }
      });
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

  onRowClick(rowData: ProgramPlan) {
    this.selectedRow = rowData;
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

  ngOnDestroy() {
    if (this.programSubscription) {
      this.programSubscription.unsubscribe();
    }
  }
}
