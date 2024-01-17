import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Coach } from 'src/app/model/coach.model';
import { ProgramService } from '../../services/program.service';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { Order, OrderStatusEnum } from 'src/app/model/order.model';
import { orderTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { Addon } from 'src/app/model/addon.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/model/user.model';
import { GoalType, Trainee } from 'src/app/model/trainee.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements AfterViewInit {
  public columns: DataGridColumn[] = orderTableColumns;
  @Input() coach: Coach;
  public orderStatuses = Object.values(OrderStatusEnum);
  public orders: Order[] = [];
  public users: Trainee[] = [];
  public programs: TrainingProgram[] = [];
  public selectedRow: Order;

  constructor(
    private orderService: OrderService,
    private programService: ProgramService,
    private userService: UserService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.users = (await this.userService.getUsers()) as Trainee[];
    this.programs = (await this.programService.getPrograms()).filter(
      (p) => p.coach_id === this.coach._id
    );

    for (const program of this.programs) {
      this.orderService.getOrdersByProgramId(program._id).then((orders) => {
        this.orders = [...this.orders, ...orders];
      });
    }
  }

  onStatusChange(event: any, order: Order): void {
    const newStatus = event.target.value;
    order.status = newStatus;
    this.handleStatusChange(order);
  }

  getRelatedUser(userId: string) {
    return this.users.find((u) => u._id === userId);
  }

  getRelatedProgram(programId: string) {
    return this.programs.find((p) => p._id === programId);
  }

  handleStatusChange(order: Order): void {
    this.orderService.modifyOrderById(order).then((updatedOrder) => {
      this.orders = this.orders.map((o) =>
        o._id === updatedOrder._id ? updatedOrder : o
      );
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

  onRowClick(rowData: Order) {
    this.selectedRow = rowData;
  }
  editRow() {}

  open(content: TemplateRef<any>) {}

  deleteRow() {}

  getUserGoals(goals: any) {
    let userGoals = [];
    for (const goal in goals) {
      if (goals[goal] === true) {
        userGoals.push(goal);
      }
    }
    return userGoals;
  }
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
