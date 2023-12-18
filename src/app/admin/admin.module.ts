import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ManageCrisesComponent } from './manage-crises/manage-crises.component';
import { ManageHeroesComponent } from './manage-heroes/manage-heroes.component';
import { MatTableModule } from '@angular/material/table';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbHighlight,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap';
import { CountryService } from './country.service';
import { NgbdSortableHeader } from './sortable.directive';
import { ProgramTableComponent } from './admin-dashboard/program-table/program-table.component';
import { ProgramService } from './services/program.service';
import { PlanTableComponent } from './admin-dashboard/plan-table/plan-table.component';
import { UserTableComponent } from './admin-dashboard/user-table/user-table.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { UserCardComponent } from './admin-dashboard/user-card/user-card.component';

@NgModule({
  declarations: [
    AdminComponent,
    ManageCrisesComponent,
    ManageHeroesComponent,
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
  providers: [CountryService, ProgramService, DecimalPipe],
})
export class AdminModule {}
