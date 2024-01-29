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
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { PlanService } from '../../services/plan.service';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { CreatePlanModalComponent } from '../../pages/worker-dashboard/create-plan-modal/create-plan-modal.component';
import { ProgramService } from '../../services/program.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-plan-table',
  templateUrl: './plan-table.component.html',
  styleUrls: ['./plan-table.component.scss'],
})
export class PlanTableComponent implements OnInit, OnDestroy {
  public translateBaseRoute = 'routing.admin.dashboard.plan.';
  public columns: DataGridColumn[] = planTableColumns;
  public plans$: ProgramPlan[] = [];
  public selectedRow: ProgramPlan | null;
  private programSubscription: Subscription;

  constructor(
    private planService: PlanService,
    private modalService: NgbModal,
    private programService: ProgramService,
    private userService: UserService
  ) {}
  async ngOnInit(): Promise<void> {
    this.programSubscription = this.planService
      .getSelectedProgramData()
      .subscribe(async (program: TrainingProgram) => {
        this.selectedRow = null;
        if (program) {
          this.plans$ = await this.planService.getRelatedPlans(program._id);
        } else {
          this.plans$ = [];
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
  async editRow() {
    const selectedRow = this.selectedRow as ProgramPlan;
    const program = await this.programService.getProgramById(
      selectedRow.program_id
    );
    const coach = await this.userService.getUserById(program.coach_id);

    const modalRef = this.modalService.open(CreatePlanModalComponent, {
      size: 'md',
    });

    modalRef.componentInstance.plan = this.selectedRow;
    modalRef.componentInstance.program = program;
    modalRef.componentInstance.coach = coach;
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

  ngOnDestroy() {
    if (this.programSubscription) {
      this.programSubscription.unsubscribe();
    }
  }
}
