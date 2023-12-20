import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from '../pages/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbHighlight,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from '../sortable.directive';
import { ProgramTableComponent } from '../components/program-table/program-table.component';
import { ProgramService } from '../services/program.service';
import { PlanTableComponent } from '../components/plan-table/plan-table.component';
import { UserTableComponent } from '../components/user-table/user-table.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../modules/app.module';
import { UserCardComponent } from '../components/user-card/user-card.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    ProgramTableComponent,
    PlanTableComponent,
    UserTableComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
    NgbDropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ProgramService, DecimalPipe],
})
export class AdminModule {}
