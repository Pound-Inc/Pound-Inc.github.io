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
import { Order, OrderStatus, OrderStatusEnum } from 'src/app/model/order.model';
import { orderTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { Trainee } from 'src/app/model/trainee.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements AfterViewInit {
  @Input() coach: Coach;
  @Input() AllOrders: Order[] = [];
  @Input() orders: Order[] = [];
  @Input() programs: TrainingProgram[] = [];
  public selectedRow: Order | undefined;
  public user: Trainee;
  public columns: DataGridColumn[] = orderTableColumns;
  public readonly orderStatuses = Object.values(OrderStatusEnum);

  constructor(
    private orderService: OrderService,
    private userService: UserService
  ) {}

  async ngAfterViewInit(): Promise<void> {}

  refreshGrid() {
    this.orders = [];
    this.AllOrders = [];
    for (const program of this.programs) {
      this.orderService.getOrdersByProgramId(program._id).then((orders) => {
        this.AllOrders = this.orders = [...this.orders, ...orders];
      });
    }
  }

  onStatusChange(event: any, order: Order): void {
    const newStatus = event.target.value;
    order.status = newStatus;
    this.handleStatusChange(order);
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

  async onRowClick(rowData: Order) {
    this.selectedRow = rowData;
    this.user = (await this.userService.getUserById(
      rowData.user_id
    )) as Trainee;
  }

  getAddons(addons: any[]) {
    const userAddons = addons.map((a) => a.name);
    return userAddons;
  }
  getAddonsTotalPrice(addons: any[]) {
    let price = 0;
    for (const addon of addons) {
      price += addon.price;
    }

    return price;
  }

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
  onFilterChange(event: any): void {
    this.selectedRow = undefined;
    const newStatus = event.target.value as OrderStatus;
    if (event.target.value === '-') {
      this.orders = this.AllOrders;
      return;
    }

    this.orders = this.AllOrders.filter((o) => o.status === newStatus);
  }

  getOrdersLength(orderStatus: OrderStatus) {
    return this.AllOrders.filter((o) => o.status === orderStatus).length;
  }
}
