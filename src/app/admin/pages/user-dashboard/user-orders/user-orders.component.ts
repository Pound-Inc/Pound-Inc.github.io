import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/model/order.model';
import { ProgramPlan } from 'src/app/model/program-plan.model';
import { TrainingProgram } from 'src/app/model/training-program.model';
import { User } from 'src/app/model/user.model';
import { orderTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss'],
})
export class UserOrdersComponent {
  public translateBaseRoute = 'routing.admin.dashboard.order.';
  @Input() columns: DataGridColumn[] = orderTableColumns;
  @Input() orders: Order[];
  @Input() user: User;

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  sendDataAndCloseModal() {
    this.closeModal.emit(true);
  }
}
