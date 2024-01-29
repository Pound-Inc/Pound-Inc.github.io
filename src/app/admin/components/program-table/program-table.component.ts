import {
  Component,
  Input,
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
import { CreateProgramModalComponent } from '../../pages/worker-dashboard/create-program-modal/create-program-modal.component';

@Component({
  selector: 'app-program-table',
  templateUrl: './program-table.component.html',
  styleUrls: ['./program-table.component.scss'],
})
export class ProgramTableComponent implements OnInit {
  public translateBaseRoute = 'routing.admin.dashboard.program.';

  public columns: DataGridColumn[] = programTableColumns;
  @Input() programs$: TrainingProgram[];
  public selectedRow: TrainingProgram;

  constructor(
    private planService: PlanService,
    private modalService: NgbModal,
    private userService: UserService,
    private programService: ProgramService
  ) {}
  async ngOnInit(): Promise<void> {}

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

  async modifyProgram() {
    const coach = await this.userService.getUserById(this.selectedRow.coach_id);
    const modalRef = this.modalService.open(CreateProgramModalComponent, {
      size: 'md',
    });

    modalRef.componentInstance.coach = coach;
    modalRef.componentInstance.programId = this.selectedRow._id;
    modalRef.componentInstance.name = this.selectedRow.name;
    modalRef.componentInstance.img = this.selectedRow.img;
    modalRef.componentInstance.description = this.selectedRow.description;
    modalRef.componentInstance.bulk = this.selectedRow.phases['bulk'];
    modalRef.componentInstance.cut = this.selectedRow.phases['cut'];
    modalRef.componentInstance.muscle = this.selectedRow.phases['muscle'];
  }

  async newProgram() {
    const coach = await this.userService.getUserById(this.selectedRow.coach_id);
    const modalRef = this.modalService.open(CreateProgramModalComponent, {
      size: 'md',
    });

    modalRef.componentInstance.coach = coach;
  }

  async deleteRow() {
    window.alert('all plans will be deleted as well, are you sure?');
    await this.programService.deleteProgramById(this.selectedRow._id);
    for (let i = 0; i < 3; i++) {
      await this.planService.deletePlanByProgramId(this.selectedRow._id);
    }

    console.log('everything has been deleted....');
  }
}
