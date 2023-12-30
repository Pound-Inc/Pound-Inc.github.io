import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/admin/services/user.service';
import { Order } from 'src/app/model/order.model';
import { User } from 'src/app/model/user.model';
import { invoiceTableColumns } from 'src/common/columns';
import { DataGridColumn } from 'src/common/interfaces/datagrid.interface';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit, AfterViewInit {
  public columns: DataGridColumn[] = invoiceTableColumns;
  public translateBaseRoute = 'routing.invoice.';
  orderData: any;
  public user: User;

  @ViewChild('invoice') invoice!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    document.dir = 'rtl';
  }
  ngAfterViewInit(): void {}

  async ngOnInit(): Promise<void> {
    const orderData = history.state.orderData;
    if (!orderData) {
      this.router.navigate(['/']);
    } else {
      this.orderData = orderData;
      this.user = await this.userService.getUserById(
        orderData.response.user_id
      );
    }
  }
}
