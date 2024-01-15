import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Coach } from 'src/app/model/coach.model';
import { ProgramService } from '../../services/program.service';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { Order, OrderStatusEnum } from 'src/app/model/order.model';
import { orderTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';
import { Addon } from 'src/app/model/addon.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
})
export class OrderTableComponent implements AfterViewInit {
  @Input() coach: Coach;
  public orderStatuses = Object.values(OrderStatusEnum);
  public orders: Order[] = [];
  public columns: DataGridColumn[] = orderTableColumns;

  constructor(
    private orderService: OrderService,
    private programService: ProgramService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    const programs = await this.programService.getPrograms();

    const relatedPrograms = programs.filter(
      (p) => p.coach_id === this.coach._id
    );

    for (const program of relatedPrograms) {
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

  handleStatusChange(order: Order): void {
    this.orderService.modifyOrderById(order).then((updatedOrder) => {
      this.orders = this.orders.map((o) =>
        o._id === updatedOrder._id ? updatedOrder : o
      );
    });
  }
}
